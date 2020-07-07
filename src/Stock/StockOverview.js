import React, { useState, useEffect, useContext } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useHistory, withRouter } from 'react-router-dom';
import { FormGroup, Label, Input } from 'reactstrap';
import { StockContext } from './StockContext';

const columns = [
    { headerName: "Symbol", field: "symbol", sortable: true },
    { headerName: "Name", field: "name", sortable: true, "filter": true },
    { headerName: "Industry", field: "industry", sortable: true, "filter": true }
];

const industries = ["Health Care", "Industrials", "Consumer Discretionary", "Information Technology",
    "Consumer Staples", "Utilities", "Financials", "Real Estate", "Materials", "Energy", "Telecommunication Services"]


function StockOverview(props) {

    const [stocks, setStocks] = useState([]); // all stocks, is used to save all the original data, would not be changed even when a user searches
    const [searchStockSymbol, setSearchStockSymbol] = useState(""); // the search text user enter in the text box
    const { path } = props.match; // "/stock"
    const history = useHistory();
    const { setSelectedStock } = useContext(StockContext);


    useEffect(() => {
        fetch('http://131.181.190.87:3001/all')
            .then(res => res.json())
            .then(data => {
                setStocks(data);
            })
    }, []) //[] means no dependencies, treated as componentDidMount in class component, only render once


    const onIndustrySelectChange = (value) => {
        let url = `http://131.181.190.87:3001/industry?industry=${value}`; // url to fetch stocks belong to a particular industry

        // if value is "all", which means the option is "In All Industries", fetch all data again
        if (value === "all") url = "http://131.181.190.87:3001/all";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setStocks(data);
            })
    }


    // navigate to stock detail page
    const handleSearchStockDetail = (stock) => { // stock: {symbol:xxx, name:xxx, industry:xxx}
        history.push(`${path}/${stock.symbol}`);
        setSelectedStock(stock);
    }


    return (
        <div className="container mt-3">
            <h2>Stock Overview</h2>

            <div className="d-flex justify-content-around">
                <FormGroup>
                    <Label for="stockCode">search stock</Label>
                    <Input
                        type="text"
                        placeholder="e.g. AAPL"
                        name="stockCode"
                        id="stockCode"
                        value={searchStockSymbol}
                        onChange={(event) => setSearchStockSymbol(event.target.value.replace('\\',''))} // event.target.value is the text user entered
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="industry">select an industry</Label>
                    <Input
                        type="select"
                        name="industry"
                        id="industry"
                        onChange={(event) => onIndustrySelectChange(event.target.value)}>

                        <option value="all">All Industries</option>
                        {industries.map(industry => <option value={industry} key={industry}>{industry}</option>)}

                    </Input>
                </FormGroup>
            </div>

            <div
                className="ag-theme-balham mx-auto"
                style={{
                    height: "650px",
                    width: "600px",
                    marginTop: 50,
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={stocks.filter(stock => RegExp(searchStockSymbol, "i").test(stock.symbol))}
                    pagination={true}
                    paginationPageSize={20}
                    onCellClicked={(params) => handleSearchStockDetail(params.data)}
                />

            </div>

        </div>
    );
}

export default withRouter(StockOverview);