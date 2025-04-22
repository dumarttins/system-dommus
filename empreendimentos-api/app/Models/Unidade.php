<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Unidade extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo', 'bloco', 'preco_venda', 'status', 'empreendimento_id'
    ];

    public function empreendimento()
    {
        return $this->belongsTo(Empreendimento::class);
    }
}


