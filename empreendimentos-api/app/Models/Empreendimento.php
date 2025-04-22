<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Empreendimento extends Model
{
    use HasFactory;

    protected $fillable = ['codigo', 'nome', 'cidade', 'previsao_entrega'];

    public function unidades()
    {
        return $this->hasMany(Unidade::class);
    }
}

