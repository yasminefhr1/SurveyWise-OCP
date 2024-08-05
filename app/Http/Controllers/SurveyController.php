<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;
use App\Models\SurveyResponse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*.text' => 'required|string|max:255',
            'questions.*.type' => 'required|string|in:text,multiple-choice,one-choice,dropdown',
            'questions.*.options' => 'array|required_if:questions.*.type,multiple-choice,one-choice,dropdown',
            'questions.*.options.*' => 'string|max:255',
        ]);

        $survey = Survey::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,    
        ]);

        foreach ($validatedData['questions'] as $questionData) {
            $question = new Question([
                'text' => $questionData['text'],
                'type' => $questionData['type'],
                'options' => in_array($questionData['type'], ['multiple-choice', 'one-choice', 'dropdown']) ? json_encode($questionData['options']) : null,
            ]);
            $survey->questions()->save($question);
        }

        return redirect()->route('admin.surveys');
    }

    public function update(Request $request, Survey $survey)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*.text' => 'required|string|max:255',
            'questions.*.type' => 'required|string|in:text,multiple-choice,one-choice,dropdown',
            'questions.*.options' => 'array|required_if:questions.*.type,multiple-choice,one-choice,dropdown',
            'questions.*.options.*' => 'string|max:255',
        ]);

        $survey->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,
        ]);

        $survey->questions()->delete();

        foreach ($validatedData['questions'] as $questionData) {
            $question = new Question([
                'text' => $questionData['text'],
                'type' => $questionData['type'],
                'options' => in_array($questionData['type'], ['multiple-choice', 'one-choice', 'dropdown']) ? json_encode($questionData['options']) : null,
            ]);
            $survey->questions()->save($question);
        }

        return redirect()->route('admin.surveys');
    }

    public function index()
    {
        $surveys = Survey::with('questions')->get();
        return Inertia::render('admin/Surveys', ['surveys' => $surveys]);
    }

    public function destroy(Survey $survey)
    {
        $survey->questions()->delete();
        $survey->delete();
        return redirect()->route('admin.surveys');
    }

    public function edit(Survey $survey)
    {
        $survey->load('questions');
        return Inertia::render('admin/EditSondage', ['survey' => $survey]);
    }

    public function showUserSurveys()
    {
        $userId = auth()->id();

        // Récupère les sondages auxquels l'utilisateur n'a pas encore participé
        $surveys = Survey::whereNotIn('id', function ($query) use ($userId) {
            $query->select('survey_id')
                  ->from('survey_responses')
                  ->where('user_id', $userId);
        })->get();

        return Inertia::render('Surveys', [
            'auth' => auth()->user(),
            'surveys' => $surveys,
        ]);
    }

    public function participate(Survey $survey)
    {
        $survey->load('questions');

        return Inertia::render('SurveyParticipation', ['survey' => $survey]);
    }

    public function submit(Request $request, Survey $survey)
    {
        Log::info('Starting survey submission', ['survey_id' => $survey->id, 'user_id' => auth()->id()]);

        $validatedData = $request->validate([
            'responses' => 'required|array',
            'responses.*' => 'required', // Valider que chaque réponse est fournie
        ]);

        $user_id = auth()->id();

        try {
            foreach ($validatedData['responses'] as $question_id => $response) {
                SurveyResponse::create([
                    'user_id' => $user_id,
                    'survey_id' => $survey->id,
                    'question_id' => $question_id,
                    'response' => is_array($response) ? json_encode($response) : $response,
                ]);
            }
            Log::info('Survey submission successful', ['survey_id' => $survey->id, 'user_id' => $user_id]);
            return redirect()->route('surveys')->with('success', 'Merci d\'avoir participé au sondage!');
        } catch (\Exception $e) {
            Log::error('Error during survey submission', ['error' => $e->getMessage()]);
            return redirect()->route('surveys')->with('error', 'Une erreur est survenue lors de la soumission.');
        }
    }
/*
    public function showResults(Survey $survey)
    {
        $responses = SurveyResponse::where('survey_id', $survey->id)
                                   ->with('question')
                                   ->get();

        return Inertia::render('admin/SurveyResults', [
            'survey' => $survey,
            'responses' => $responses,
        ]);
    }*/

    public function afficher()
    {
        $surveys = Survey::all();
        return Inertia::render('admin/Results', ['surveys' => $surveys]);
    }

    public function userHistory()
    {
        $userId = auth()->id();

        // Récupère les sondages auxquels l'utilisateur a participé
        $surveys = Survey::whereIn('id', function ($query) use ($userId) {
            $query->select('survey_id')
                  ->from('survey_responses')
                  ->where('user_id', $userId);
        })->get();

        return Inertia::render('History', [
            'auth' => auth()->user(),
            'surveys' => $surveys,
        ]);
    }

    public function showGraphs(Survey $survey)
    {
        $survey->load('questions');
        $responses = SurveyResponse::where('survey_id', $survey->id)->get();

        return Inertia::render('admin/SurveyGraphs', [
            'survey' => $survey,
            'survey_responses' => $responses,
        ]);
    }

    public function history()
    {
        $userId = auth()->id();

        $participatedSurveyIds = DB::table('survey_responses')
            ->where('user_id', $userId)
            ->pluck('survey_id');

        $surveys = Survey::whereIn('id', $participatedSurveyIds)->get();

        return view('surveys.history', compact('surveys'));
    }

    public function show($id)
    {
        // Trouver le sondage par son ID
        $survey = Survey::find($id);

        // Vérifier si le sondage existe
        if (!$survey) {
            abort(404, 'Survey not found');
        }

        // Retourner une vue ou des données
        return view('surveys.show', compact('survey'));
    }

    public function showResults(Survey $survey)
    {
        $responses = SurveyResponse::where('survey_id', $survey->id)
                                ->with('question')
                                ->get();

        if ($responses->isEmpty()) {
            return redirect()->route('admin.results')->with('error', 'No responses available for this survey.');
        }

        return Inertia::render('admin/SurveyResults', [
            'survey' => $survey,
            'responses' => $responses,
        ]);
    }



    /*public function getResponses($id) {
        $responses = SurveyResponse::where('survey_id', $id)->with('question')->get();
        return response()->json($responses);
    }*/

    public function getResponses($id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $survey = Survey::find($id);
        if (!$survey) {
            return response()->json(['message' => 'Survey not found'], 404);
        }
    
        $responses = SurveyResponse::where('survey_id', $id)
            ->with('question')
            ->get();
    
        return response()->json($responses);
    }
    
    
    // app/Http/Controllers/SurveyController.php

public function exportResponses($id, $format)
{
    $responses = SurveyResponse::where('survey_id', $id)->with('question')->get();

    switch ($format) {
        case 'csv':
            $csv = $this->convertToCSV($responses);
            return response()->stream(function() use ($csv) {
                echo $csv;
            }, 200, [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="responses.csv"',
            ]);
        case 'json':
            return response()->json($responses);
        // Ajoute d'autres formats ici si nécessaire
        default:
            return response()->json(['error' => 'Unsupported format'], 400);
    }
}

protected function convertToCSV($responses)
{
    $handle = fopen('php://temp', 'r+');
    fputcsv($handle, ['Question', 'Response']);

    foreach ($responses as $response) {
        fputcsv($handle, [$response->question->text, $response->response]);
    }

    rewind($handle);
    return stream_get_contents($handle);
}

    
}
