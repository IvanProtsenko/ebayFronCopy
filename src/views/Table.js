import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { apiService, client, SUBSCRIBE_ADVERTS } from '../services/ApiService';
import columnDefsAccounts from '../services/utils/columnDefs';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class Table extends Component {
  state = {
    selectedRow: false,
    selectedRows: [],
    modalShow: false,
    abandonModalShow: false,
    gridRef: null,
    gridApi: null,
    rowData: [],
    columnDefs: columnDefsAccounts,
    defaultColDef: {
      resizable: true,
      sortable: true,
      flex: 1,
      filter: true,
    },

    autoGroupColumnDef: {
      width: 250,
    },

    containerStyle: { width: '100%', height: '900px' },
    gridStyle: { height: '100%', width: '100%' },
  };

  constructor(props) {
    super(props);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  changeRowData(data) {
    this.setState(() => {
      return { rowData: data };
    });
  }

  onLoadGrid = (params) => {
    this.setState(() => {
      return { gridRef: React.createRef({ ...params }) };
    });
    this.setState(() => {
      return { gridApi: params.api };
    });
  };

  async onCellValueChanged(event) {
    console.log('Data after change is', event.data);
    let newAdvert = {
      adItemId: event.data.adItemId,
      link: event.data.link,
      title: event.data.title,
      price: event.data.price,
      location: event.data.location,
      status: event.data.status,
      statusDescription: event.data.statusDescription,
      consoleGeneration: event.data.consoleGeneration,
      controllersCount: event.data.controllersCount,
    };
    await new Promise((r) => setTimeout(r, Math.random() * 1000));
    await apiService.updateAdvertByPk(newAdvert);
  }

  async onSelectionChanged() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    if (selectedRows.length > 0) {
      this.setState(() => {
        return { selectedRow: true };
      });
    }
  }

  async componentDidMount() {
    const adminSecret = localStorage.getItem('userToken');
    if (!adminSecret) window.location.href = '/';
    const changeRowData = async (data) => {
      this.setState(() => {
        return { rowData: data };
      });
      // await this.setFilters();
    };

    const observer = client.subscribe({
      query: SUBSCRIBE_ADVERTS,
    });
    observer.subscribe({
      next(data) {
        changeRowData(data.data.Adverts);
      },
      error(err) {
        console.log(err);
      },
    });
    const adverts = await apiService.getAdverts();
    console.log(adverts);
    this.setState(() => {
      return { rowData: adverts };
    });
    // await this.setFilters();
  }

  getRowId(params) {
    return params.data.adItemId;
  }

  render() {
    return (
      <div>
        <div className="ag-theme-alpine" style={{ height: 800, width: '100%' }}>
          <AgGridReact
            rowData={this.state.rowData}
            getRowId={this.getRowId}
            ref={this.state.gridRef}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            pivotPanelShow={'always'}
            suppressAggFuncInHeader={true}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            onGridReady={this.onLoadGrid}
            rowSelection={'multiple'}
            onCellValueChanged={this.onCellValueChanged}
            onSelectionChanged={this.onSelectionChanged}
            animateRows={true}
            enableRangeSelection={true}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}
