import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Icon24AddOutline,
  Icon24EmployeeOutline,
  Icon24Filter,
} from "@vkontakte/icons";
import { useFormik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Category,
  IconSearchResult,
  Permissions,
  ProductSearchResult,
  ProductSort,
} from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addProducts,
  clearProducts,
  incPage,
  setPage,
} from "../../redux/products/reducer";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions } from "../../redux/userData/types";
import ProductCreate from "../product/ProductCreate";
import ProductsList from "../product/ProductsList";

const List = () => {
  const page = useAppSelector((state) => state.products.page);
  const permissions = useAppSelector((state) => state.userData.permissions);
  const { data: categoriesData } = useQuery<{
    categories: Category[];
  }>(gql`
    query getCategories {
      categories {
        id
        name
        color
      }
    }
  `);
  const [getIcons, { data: iconsData, loading: iconsLoading }] = useLazyQuery<{
    icons: IconSearchResult;
  }>(
    gql`
      query icons($limit: Int, $page: Int, $category: ObjectID) {
        icons(limit: $limit, page: $page, category: $category) {
          result {
            id
            image
            name
          }
          hasMore
        }
      }
    `,
    { fetchPolicy: "no-cache", variables: { limit: 1000 } }
  );
  const serverId = useAppSelector((state) => state.userData.serverId);
  const [getProducts, { data: productsData, loading: productsLoading }] =
    useLazyQuery<{
      products: ProductSearchResult;
    }>(
      gql`
        query products(
          $page: Int
          $limit: Int
          $search: String
          $server: ObjectID!
          $category: ObjectID
          $icon: ObjectID
          $sort: ProductSort
        ) {
          products(
            server: $server
            search: $search
            category: $category
            icon: $icon
            sort: $sort
            limit: $limit
            page: $page
          ) {
            result {
              id
              description
              cost
              createdAt
              isHighlighted
              amount
              icon {
                name
                image
                category {
                  name
                  color
                }
              }
              owner {
                id
                avatar
                nickname
                lastOnline
                user {
                  permissions
                }
              }
            }
            hasMore
          }
        }
      `,
      {
        fetchPolicy: "no-cache",
        variables: {
          page: 1,
          limit: 25,
          server: serverId,
          sort: ProductSort.Default,
        },
      }
    );
  const products = useAppSelector((state) => state.products.products);
  const form = useFormik({
    initialValues: {
      sort: ProductSort.Default,
      category: "",
      search: "",
      icon: "",
    },
    onSubmit: (values) => {
      dispatch(clearProducts());
      getProducts({
        variables: {
          sort: form.values.sort,
          category: form.values.category ? form.values.category : null,
          page: 1,
          icon: form.values.icon ? form.values.icon : null,
          search: form.values.search,
        },
      });
      dispatch(setPage(2));
      dispatch(setModal(null));
    },
    onReset: (values) => {
      dispatch(clearProducts());
      getProducts({
        variables: {
          sort: form.values.sort,
          category: form.values.category ? form.values.category : null,
          page: 1,
          icon: form.values.icon ? form.values.icon : null,
          search: form.values.search,
        },
      });
      setPage(2);
    },
  });
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const blacklist = useAppSelector((state) => state.userData.blacklist);
  const dispatch = useAppDispatch();
  const hideUsers = useAppSelector(
    (state) => state.settings.hideBlacklistedProfiles
  );
  const [filtersIsOpen, setFiltersIsOpen] = React.useState(false);
  const isMobileButtonsOn = useMediaQuery("(max-width: 600px)");
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    if (!productsData) return;

    dispatch(addProducts(productsData.products.result));
    setHasMore(false);
  }, [productsData, dispatch, setHasMore]);

  React.useEffect(() => {
    if (
      productsLoading ||
      products.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getProducts({
          variables: {
            sort: form.values.sort,
            category: form.values.category ? form.values.category : null,
            page: page,
            icon: form.values.icon ? form.values.icon : null,
            search: form.values.search,
          },
        });
        dispatch(incPage());
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, productsLoading, products, page, getProducts, dispatch]);

  React.useEffect(() => {
    if (products.length !== 0) return;
    dispatch(clearProducts());
    getProducts({
      variables: {
        sort: form.values.sort,
        category: form.values.category ? form.values.category : null,
        page: 1,
        icon: form.values.icon ? form.values.icon : null,
        search: form.values.search,
      },
    });
    dispatch(setPage(2));
    // eslint-disable-next-line
  }, [dispatch]);

  React.useEffect(() => {
    getIcons({ variables: { category: form.values.category } });
  }, [form.values.category, getIcons]);

  React.useEffect(() => {
    if (!iconsData) return;
    if (
      !iconsData?.icons.result.map((el) => el.id).includes(form.values.icon)
    ) {
      form.setValues({
        sort: form.values.sort,
        category: form.values.category,
        search: form.values.search,
        icon: "",
      });
    }
    // eslint-disable-next-line
  }, [iconsData]);

  const openCreateForm = () =>
    dispatch(
      setModal(
        <ProductCreate
          categories={categoriesData ? categoriesData.categories : []}
        />
      )
    );

  React.useEffect(() => {
    if (!filtersIsOpen) return;
    openFilters();
    // eslint-disable-next-line
  }, [form.values]);

  const openFilters = () => {
    setFiltersIsOpen(true);
    dispatch(
      setModal(
        <Dialog
          maxWidth="sm"
          fullWidth
          open={true}
          onClose={() => {
            dispatch(setModal(null));
            setFiltersIsOpen(false);
          }}
        >
          <Box
            component="form"
            onSubmit={(e: any) => {
              form.handleSubmit(e as React.FormEvent<HTMLFormElement>);
            }}
            onReset={form.handleReset}
          >
            <DialogTitle>Фильтры</DialogTitle>
            <DialogContent className="hide-scrollbar">
              <Stack spacing={2}>
                <div style={{ width: "100%" }}>
                  <InputLabel id="category-label">Категория</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    value={form.values.category}
                    onChange={form.handleChange}
                    fullWidth
                    size="small"
                  >
                    {(categoriesData
                      ? [
                          { value: "", label: "Все", color: undefined },
                          ...categoriesData?.categories.map((category) => ({
                            value: category.id,
                            label: category.name,
                            color: category.color,
                          })),
                        ]
                      : [{ value: "", label: "-", color: "#FFFFFF" }]
                    ).map((c) => (
                      <MenuItem
                        value={c.value}
                        sx={{ color: c.color ? c.color : undefined }}
                      >
                        {c.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {form.values.category !== "" && (
                  <div style={{ width: "100%" }}>
                    <InputLabel id="icon-label">Выберите товар</InputLabel>
                    <Autocomplete
                      id="icon"
                      fullWidth
                      options={
                        iconsData
                          ? iconsData.icons.result.map((icon) => ({
                              value: icon.id,
                              label: icon.name,
                              image: icon.image,
                            }))
                          : []
                      }
                      loading={iconsLoading}
                      loadingText="Загрузка..."
                      noOptionsText="Не найдено"
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      onChange={(e, value) =>
                        form.setFieldValue("icon", value ? value.value : "")
                      }
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { marginRight: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <LazyLoadImage
                            alt={""}
                            src={option.image} // use normal <img> attributes as props
                            width="24px"
                            height="24px"
                            style={{ imageRendering: "pixelated" }}
                          />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </div>
                )}
                <div style={{ width: "100%" }}>
                  <InputLabel id="sort-label">Сортировка</InputLabel>
                  <Select
                    id="sort"
                    name="sort"
                    value={form.values.sort}
                    onChange={form.handleChange}
                    fullWidth
                    size="small"
                  >
                    {[
                      {
                        value: ProductSort.Default,
                        label: "По умолчанию",
                      },
                      {
                        value: ProductSort.CostAsc,
                        label: "Сначала дешевые",
                      },
                      {
                        value: ProductSort.CostDesc,
                        label: "Сначала дорогие",
                      },
                      {
                        value: ProductSort.DateDesc,
                        label: "Сначала новые",
                      },
                      {
                        value: ProductSort.DateAsc,
                        label: "Сначала старые",
                      },
                    ].map((c) => (
                      <MenuItem value={c.value}>{c.label}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ width: "100%" }}>
                  <InputLabel id="search-label">Поиск</InputLabel>
                  <TextField
                    fullWidth
                    error={!!form.errors.search}
                    color={form.errors.search === "error" ? "error" : undefined}
                    id="search"
                    helperText={
                      form.errors.search ? form.errors.search : undefined
                    }
                    variant="outlined"
                    name="search"
                    multiline
                    value={form.values.search}
                    onChange={form.handleChange}
                    size="small"
                  />
                </div>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Button
                  color="success"
                  size="medium"
                  type="submit"
                  variant="contained"
                  disabled={!form.isValid}
                  fullWidth
                >
                  Применить
                </Button>
                <Button
                  size="medium"
                  type="reset"
                  variant="outlined"
                  disabled={
                    JSON.stringify(form.initialValues) ===
                    JSON.stringify(form.values)
                  }
                  fullWidth
                >
                  Сбросить
                </Button>
              </Stack>
            </DialogActions>
          </Box>
        </Dialog>
      )
    );
  };

  const openAdminActions = () =>
    dispatch(
      setModal(
        categoriesData
          ? null // TODO
          : null
      )
    );

  return (
    <Stack spacing={2} sx={{ flex: 1 }}>
      <Stack spacing={2} direction="row">
        {categoriesData && (
          <Stack direction={isMobileButtonsOn ? "column" : "row"} spacing={2}>
            <Button
              size="medium"
              endIcon={<Icon24Filter />}
              onClick={openFilters}
              variant={"outlined"}
              fullWidth={isMobileButtonsOn}
            >
              Фильтры
            </Button>
            <Button
              size="medium"
              endIcon={<Icon24AddOutline />}
              onClick={openCreateForm}
              variant="outlined"
              fullWidth={isMobileButtonsOn}
            >
              Создать товар
            </Button>
            {(checkPermissions(Permissions.CategoryModify, permissions) ||
              checkPermissions(Permissions.IconModify, permissions)) && (
              <Button
                size="medium"
                endIcon={<Icon24EmployeeOutline />}
                onClick={openAdminActions}
                variant="outlined"
                color="error"
                fullWidth={isMobileButtonsOn}
              >
                Админ-действия
              </Button>
            )}
          </Stack>
        )}
      </Stack>
      <ProductsList
        products={products.filter(
          (product) => !(blacklist.includes(product.owner.id) && hideUsers)
        )}
      />

      {productsLoading && <LinearProgress />}
      {((productsData?.products.hasMore && !productsLoading) || hasMore) && (
        <div style={{ minHeight: "10px" }} ref={lastElementRef}></div>
      )}
    </Stack>
  );
};

export default List;
