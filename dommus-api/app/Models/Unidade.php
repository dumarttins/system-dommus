<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    use HasFactory;

    protected $fillable = [
        'empreendimento_id',
        'codigo',
        'bloco',
        'preco_venda',
        'status'
    ];

    public function empreendimento()
    {
        return $this->belongsTo(Empreendimento::class);
    }

    public function isDisponivel()
    {
        return $this->status === 'DISPONIVEL';
    }

    public function podeSerExcluida()
    {
        return $this->status !== 'VENDIDA' && $this->status !== 'RESERVADA';
    }
}