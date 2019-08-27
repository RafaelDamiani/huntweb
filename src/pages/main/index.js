import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class main extends Component {
    
    // state é sempre um objeto
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() { // acao executada logo que o component e é exibido em tela
        this.loadProducts();
    }

    // funcoes criadas pelo usuario precisam ser em formato de arrow function para enxergar
    // o escopo da variavel this. Arrow function nao modifica o valor da variavel this
    loadProducts = async (page = 1) => { //async & await - maneira menos verbosa de lidar com 'promises'
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page });
    }

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;;

        this.loadProducts(pageNumber);
    }

    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}