<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LogReajuste extends Model
{
    use HasFactory;

    protected $fillable = ['empreendimento_id', 'percentual'];
}
