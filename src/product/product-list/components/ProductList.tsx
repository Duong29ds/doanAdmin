import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableSelection,
  Toolbar,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  SearchState,
  IntegratedSelection,
  IntegratedFiltering,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import ToolbarCustom from './table/ToolbarCustom';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { dispatch } from 'src/common/redux/store';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { fetchingProducts } from 'src/product/service';
import { rowsSelector, setRows } from 'src/product/product.slide';
import { useSelector } from 'react-redux';
import { useDeleteProd } from 'src/product/hook/useDeleteProd';
import Popup from 'src/common/components/Popup';
import { FormProvider, RHFSelect } from 'src/common/components/hook-form';
import { fetchingPortfolios } from 'src/portfolio/service';
import { IOptions } from 'src/product/interface';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { useAddProd2Portf } from 'src/product/hook/useAddProd2Portf';

const columns = [
  { name: 'id', title: 'Id' },
  { name: 'name', title: 'Name' },
  { name: 'description', title: 'Description' },
  { name: 'total', title: 'Total' },
  { name: 'price', title: 'Price' },
  { name: 'post_service', title: 'Post Service' },
];

type IForm = {
  portfolio: string;
};

export default function ProductList() {
  const [selection, setSelection] = useState([]);
  const [idListAddtoPortf, setIdListAddToPortf] = useState<number[]>([]);
  const [portfolioOptions, setdataPortOptions] = useState<IOptions[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const rows = useSelector(rowsSelector);

  const methods = useForm<IForm>({
    defaultValues: {},
  });

  const {getValues}=methods;

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery(
    ['products'],
    fetchingProducts
  );

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Xoá nhà cung cấp thành công!', {
      variant: 'success',
      autoHideDuration: 1000,
    });
    refetch();
    setSelection([]);
  };
  const onError = () => {
    enqueueSnackbar('Xoá thất bại', {
      variant: 'error',
    });
  };

  const onSuccess2 = () => {
    enqueueSnackbar('Thêm vào danh mục thành công!', {
      variant: 'success',
      autoHideDuration: 1000,
    });
    refetch();
    setSelection([]);
  };
  const onError2 = () => {
    enqueueSnackbar('Thêm thất bại', {
      variant: 'error',
    });
  };

  const { data: dataPort, isSuccess: isSuccessProd } = useQuery(
    ['portfolios'],
    fetchingPortfolios
  );

  const { mutate } = useDeleteProd({ onSuccess, onError });
  const { mutate:mutateAddProdToPortf } = useAddProd2Portf({ onSuccess:onSuccess2, onError:onError2 });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRows(data.data));
    }
  }, [isSuccess, data?.data]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.product.edit(id));
  };

  const handleDeleteRows = (idlist: number[]) => {
    mutate({
      idlist,
    });
  };

  const handleOpenPopupPortfolio = (idList: number[]) => {
    setIdListAddToPortf(idList);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleAddToPortfolio = () => {
    const params={
      id: getValues('portfolio'),
      idListProduct:idListAddtoPortf
    }
    mutateAddProdToPortf(params)
  };

  useEffect(() => {
    if (isSuccessProd) {
      const optionsTemp = dataPort.data.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setdataPortOptions(optionsTemp);
      methods.reset({
        portfolio: optionsTemp[0]?.value
      })
    }
  }, [isSuccessProd, dataPort?.data]);

  console.log(getValues());

  const ProductImageColumn = (props: any) => (
    <DataTypeProvider
      for={['image']}
      formatterComponent={() => {
        return (
          <img
            src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/297244164_1460435901054767_4188384556076195340_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0debeb&_nc_ohc=13RKnEjg_7EAX-ylFVn&tn=_9eR_sHOcoFXFs8A&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAOyTgMV_lLA_lKDjG4rNKTpFHwKvH0WuQ6yezx3QOLXQ&oe=636256F6"
            srcSet="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/297244164_1460435901054767_4188384556076195340_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0debeb&_nc_ohc=13RKnEjg_7EAX-ylFVn&tn=_9eR_sHOcoFXFs8A&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAOyTgMV_lLA_lKDjG4rNKTpFHwKvH0WuQ6yezx3QOLXQ&oe=636256F6"
            alt="product-image"
            loading="lazy"
          />
        );
      }}
      {...props}
    />
  );

  return (
    <>
      <FormProvider methods={methods}>
        <Paper>
          <Grid rows={rows} columns={columns}>
            <SearchState />
            <SelectionState
              selection={selection}
              onSelectionChange={setSelection as (selection: (string | number)[]) => void}
            />
            <Toolbar
              rootComponent={() =>
                ToolbarCustom({
                  selection,
                  handleEditRow,
                  handleDeleteRows,
                  handleOpenPopupPortfolio,
                })
              }
            />
            <ProductImageColumn />
            <IntegratedSelection />
            <IntegratedFiltering />
            <VirtualTable />
            <TableHeaderRow />
            <TableSelection showSelectAll />
            <SearchPanel />
          </Grid>
        </Paper>
        <Popup open={openPopup}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <RHFSelect name="portfolio" label="Portfolio">
              {portfolioOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Button onClick={handleClosePopup}>Cancel</Button>
              <Button
                onClick={handleAddToPortfolio}
                sx={{
                  backgroundColor: 'transparent',
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Popup>
      </FormProvider>
    </>
  );
}
