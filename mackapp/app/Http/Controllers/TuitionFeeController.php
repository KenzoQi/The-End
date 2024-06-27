<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TuitionFee;
use Illuminate\Support\Facades\Auth;

class TuitionFeeController extends Controller
{
    public function index()
    {
        $tuitionFees = TuitionFee::with('enrollment:id,first_name,last_name')->get();

        $tuitionFees = $tuitionFees->map(function ($fee) {
            return [
                'id' => $fee->id,
                'user_id' => $fee->user_id,
                'enrollment_id' => $fee->enrollment_id,
                'first_name' => $fee->enrollment->first_name,
                'last_name' => $fee->enrollment->last_name,
                'tuition_fee' => $fee->tuition_fee,
            ];
        });

        return response()->json($tuitionFees);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tuition_fee' => 'required|numeric',
            'enrollment_id' => 'required|exists:enrollments,id',
        ]);

        $tuitionFee = TuitionFee::create([
            'user_id' => Auth::id(),
            'tuition_fee' => $request->tuition_fee,
            'enrollment_id' => $request->enrollment_id,
        ]);

        return response()->json(['message' => 'Tuition fee saved successfully!', 'tuition_fee' => $tuitionFee], 201);
    }
}
