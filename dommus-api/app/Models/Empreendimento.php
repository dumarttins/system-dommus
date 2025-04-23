<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empreendimento extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nome',
        'cidade',
        'previsao_entrega'
    ];

    protected $casts = [
        'previsao_entrega' => 'date'
    ];

    public function unidades()
    {
        return $this->hasMany(Unidade::class);
    }

    public function reajusteLogs()
    {
        return $this->hasMany(ReajusteLog::class);
    }

    public function getVgvVendidasAttribute()
    {
        return $this->unidades()->where('status', 'VENDIDA')->sum('preco_venda');
    }

    public function getVgvReservadasAttribute()
    {
        return $this->unidades()->where('status', 'RESERVADA')->sum('preco_venda');
    }

    public function getEstoqueDisponivelAttribute()
    {
        return $this->unidades()->where('status', 'DISPONIVEL')->count();
    }
}