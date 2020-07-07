import React from 'react';
import { Jumbotron } from 'reactstrap';
import home_image from '../assets/images/Stock.jpg';

function Home() {
    return (

        <div style={{ marginTop: 100 }}>
            <Jumbotron>
                <h1 className="display-3">Stock Rocks!</h1>
                <img src={home_image} className="img-fluid" alt="Stock Brand" style={{ height: 300 }} />
                <p className="lead">Welcome to the Stock Market Page. You may click on stocks to view all the stocks or search to view the latest 100 days of activity.</p>
                <hr />
                <p className="lead">
                    <a href="/stock" className="btn btn-primary">Find Stock!</a>
                </p>
            </Jumbotron>
        </div>
    );
}

export default Home;