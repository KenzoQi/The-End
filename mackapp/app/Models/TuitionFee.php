<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TuitionFee extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'enrollment_id', 'tuition_fee'];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }
}
