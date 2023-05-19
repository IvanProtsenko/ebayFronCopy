import LinkRenderer from "../../views/renderers/LinkRenderer";
import LocalLinkRenderer from "../../views/renderers/LocalLinkRenderer";

const columnDefsAccounts = [
  {
    field: 'adItemId',
    headerName: 'Id',
    editable: true,
    enableRowGroup: true,
    // checkboxSelection: true,
    valueGetter: (params) => {
      return params.data.adItemId;
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'link',
    headerName: 'Link',
    // editable: true,
    // enableRowGroup: true,
    cellRenderer: LinkRenderer
  },
  {
    headerName: 'Link on chat',
    // editable: true,
    // enableRowGroup: true,
    cellRenderer: LocalLinkRenderer
  },
  // {
  //   field: 'buyNowAllowed',
  //   headerName: 'Buy now',
  //   editable: true,
  //   enableRowGroup: true,
  // },
  // {
  //   field: 'deliveryAllowed',
  //   headerName: 'Delivery now',
  //   editable: true,
  //   enableRowGroup: true,
  // },
  // {
  //   field: 'offerAllowed',
  //   headerName: 'Offer now',
  //   editable: true,
  //   enableRowGroup: true,
  // },
  // {
  //   field: 'tradeAllowed',
  //   headerName: 'Trade now',
  //   editable: true,
  //   enableRowGroup: true,
  // },
  {
    field: 'initialResponse',
    headerName: 'Initial response',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'consoleGeneration',
    headerName: 'Generation',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'statusDescription',
    headerName: 'Status description',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    editable: true,
    enableRowGroup: true,
  },
  {
    field: 'created_at',
    headerName: 'Created',
    editable: true,
    enableRowGroup: true,
  },
];

export default columnDefsAccounts;
