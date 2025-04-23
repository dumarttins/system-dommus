<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReajusteLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'empreendimento_id',
        'percentual'
    ];

    public function empreendimento()
    {
        return $this->belongsTo(Empreendimento::class);
    }
}