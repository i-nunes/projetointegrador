import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrinho } from '../model/carrinho';
import { CategoriaProduto } from '../model/categoriaProduto';
import { Produto } from '../model/produto';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-padarias',
  templateUrl: './padarias.component.html',
  styleUrls: ['./padarias.component.css']
})
export class PadariasComponent implements OnInit {

  categoria: CategoriaProduto= new CategoriaProduto()
  idCategoria: number

  listaProdutos:Produto[];
  carrinho:Carrinho = new Carrinho();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private produtoService:ProdutoService,
    private carrinhoService:CarrinhoService
  ){ }

  ngOnInit() {

    this.idCategoria= this.route.snapshot.params['id']
    this.findByIdCategoria(this.idCategoria)
  }

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: CategoriaProduto ) =>{
      this.categoria = resp

    })
  }


  addCarrinho(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp:Produto)=>{
      this.carrinho = new Carrinho()
      this.carrinho.produto = resp
      this.postCarrinho(this.carrinho)
    })
  }

  postCarrinho(carrinho:Carrinho){
    this.carrinhoService.postCarrinho(carrinho).subscribe((resp:Carrinho)=>{
      this.carrinho = resp
    })
  }


}
