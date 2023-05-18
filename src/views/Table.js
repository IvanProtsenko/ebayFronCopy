import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { apiService, client, SUBSCRIBE_ADVERTS } from '../services/ApiService';
import Button from 'react-bootstrap/Button';
import AddAccountModal from './modals/AddAccountModal';
import AbandonAccountModal from './modals/AbandonAccModal';
import columnDefsAccounts from '../services/utils/columnDefs';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { apiServiceCustomResolvers } from '../services/ApiCustomResolvers';
import exportToCsv from '../services/utils/exportToCsv';
import { genEmail, genPass } from '../services/utils/generateEmailAndPass';
// import { genEApass } from '@mmo.delivery/mmo-interfaces-other/lib';
// import { generate_EA_REG_import } from '@mmo.delivery/mmo-interfaces-other/lib/ea-generator';

const reader = new FileReader();

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
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeAbandonModal = this.closeAbandonModal.bind(this);
    this.openAbandonModal = this.openAbandonModal.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  closeModal() {
    this.setState(() => {
      return { modalShow: false };
    });
  }

  openModal() {
    this.setState(() => {
      return { modalShow: true };
    });
  }

  openAbandonModal() {
    this.setState(() => {
      return { selectedRows: this.state.gridRef.current.api.getSelectedRows() };
    });
    this.setState(() => {
      return { abandonModalShow: true };
    });
  }

  closeAbandonModal() {
    this.setState(() => {
      return { abandonModalShow: false };
    });
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

  async deleteAccount() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    for (let i = 0; i < selectedRows.length; i++) {
      let emailDeleted = selectedRows[i].email;
      await apiService.deleteAccount(emailDeleted);
    }
  }

  async archiveAccount() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    const emailsToArchive = selectedRows.map((row) => row.email);
    await apiService.archiveAccount(emailsToArchive);
  }

  async registerAccount() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    selectedRows.forEach(async (row) => {
      await this.Register(row.email, localStorage.getItem('userPassword'));
    });
  }

  async signInAccount() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    selectedRows.forEach(async (row) => {
      await this.Login(row.email, localStorage.getItem('userPassword'));
    });
  }

  // async exportAsCsv(e) {
  //   let selectedRows = this.state.gridRef.current.api.getSelectedRows();

  //   const headers = [
  //     [
  //       'email',
  //       'appPassword',
  //       'phoneRegion',
  //       'httpProxy',
  //       'socksProxy',
  //       'dateOfBirthday',
  //       'firstName',
  //       'lastName',
  //       'xboxGamerTag',
  //     ],
  //   ];

  //   const rows = [];
  //   if (selectedRows.length == 0) {
  //     selectedRows = this.state.rowData;
  //   }
  //   selectedRows.forEach((row) => {
  //     let tempRow = {
  //       email: row.email || '',
  //       password: row.password || '',
  //       GAuth: row.GAuth || '',
  //       recoveryCodes: row.recoveryCodes || '',
  //       appPassword: row.appPassword || '',
  //       dateOfBirthday: row.dateOfBirthday || '',
  //       firstName: row.firstName || '',
  //       lastName: row.lastName || '',
  //       xboxGamerTag: row.xboxGamerTag || '',

  //       phoneRegion: row.phoneRegion || '',
  //       httpProxy: row.httpProxy || '',
  //       socksProxy: row.socksProxy || '',
  //       proxyRotationURL: row.proxyRotationURL || '',
  //     };
  //     rows.push(tempRow);
  //   });
  //   const allRows = await apiServiceCustomResolvers.exportAccsToCSV(rows);
  //   console.log(allRows);
  //   // const allRows = headers.concat(rows);
  //   exportToCsv('imaps', allRows);
  // }

  async stopAccount() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    selectedRows.forEach(async (row) => {
      await this.StopAcc(row.email, localStorage.getItem('userPassword'));
    });
  }

  async fetchMailFromAccount() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    selectedRows.forEach(async (row) => {
      await this.FetchMail(row.email, localStorage.getItem('userPassword'));
    });
  }

  async seeAccountMailsFromDB() {
    const selectedRows = this.state.gridRef.current.api.getSelectedRows();
    window.open(`/mails/${selectedRows[0].email}`, '_blank');
    // window.location.href = `/mails/${selectedRows[0].email}`;
  }

  async downloadProxyCSV(input) {
    const csv = input.target.files[0];
    reader.readAsText(csv);
    const accounts = [];
    reader.onload = async (e) => {
      let lines = e.target.result.split('\n');
      let headers = lines[0].split(',');
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          headers[j] = headers[j].trim();
          obj[headers[j]] = currentline[j]
            .replace(/\"/g, '')
            .replace(/\r/g, '');
        }
        let newAccount = {
          email: genEmail(),
          password: genPass(),
          httpProxy: obj['HttpProxy'],
          socksProxy: obj['SocksProxy'],
          proxyRotationURL: obj['ProxyRotationURL'],
          customerId: localStorage.getItem('userId'),
        };
        accounts.push(newAccount);
      }
      // console.log(accounts);
      await apiService.createAccounts(accounts);
    };
  }

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
    };
    await new Promise(r => setTimeout(r, Math.random() * 1000));
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

  // async setFilters() {
  //   const filterInstance = await this.state.gridApi.getFilterInstance('status');
  //   this.state.gridApi.onFilterChanged();
  // }

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
        <div className="buttons">
          <Button
            className="addButton"
            onClick={() => {
              this.exportAsCsv();
            }}
            variant="warning"
          >
            Экспорт
          </Button>
          <input type="file" onChange={this.downloadProxyCSV} />
        </div>
        <AddAccountModal show={this.state.modalShow} onHide={this.closeModal} />
        <AbandonAccountModal
          rows={this.state.selectedRows}
          show={this.state.abandonModalShow}
          onHide={this.closeAbandonModal}
        />
        <div className="ag-theme-alpine" style={{ height: 800, width: '100%' }}>
          <AgGridReact
            rowData={this.state.rowData}
            getRowId={this.getRowId}
            immutableData={true}
            ref={this.state.gridRef}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            // rowGroupPanelShow={'always'}
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
