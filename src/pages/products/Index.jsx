import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import {
  axiosInstance,
  axiosInstanceWithoutBaseURL,
} from "../../services/axiosInstance";
import { useAuth } from "../../context/useAuth";
import { ErrorMessage, Field, Formik ,Form} from "formik";
import { productSchema } from "../../schema/productSchema";

const Products = () => {
  const { token } = useAuth();
  const [url, setUrl] = useState(null);
  const [catalogs, setCatalogs] = useState(null);
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [products, setProducts] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [newProduct, setNewProduct] = useState(false);
  const [reload,setReload] = useState(false);

  const getCatalogs = () => {
    axiosInstance(token)
      .get(`catalogs/?limit=100&offset=0`)
      .then((res) => {
        setCatalogs(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCatalogs();
  }, []);

  const getProductsForCatalog = (id) => {
    axiosInstance(token)
      .get(`/catalogs/${id}/products/?limit=10&offset=0`)
      .then((res) => {
        setProducts(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedCatalog === "") return;
    getProductsForCatalog(selectedCatalog);
  }, [selectedCatalog,reload]);

  const getPaginatedProducts = () => {
    axiosInstanceWithoutBaseURL(token)
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        setProducts(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (url === null) return;
    getPaginatedProducts();
  }, [url]);

  const getProductDetails = (id) => {
    axiosInstance(token)
      .get(`/products/${id}/`)
      .then((res) => {
        setProductDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateNew = (values) => {
    // console.log(values);
    axiosInstance(token).post(`/catalogs/${selectedCatalog}/products/add/`,{
      title:values.title,
      sku:values.sku,
      extra_attributes:{
        price:values.price,
        year:values.year
      }
    }).then((res)=>{console.log(res.data);
      setNewProduct(false);
      setReload(!reload);
    }).catch((err)=>console.log(err));
  };

  return (
    <>
      <div>Products</div>
      <div>
        {catalogs && (
          <select
            name="catalogs"
            value={selectedCatalog}
            onChange={(event) => setSelectedCatalog(event.target.value)}
          >
            Catalogs
            <option>--select catalog--</option>
            {catalogs?.catalogs?.map((e) => {
              return (
                <option key={e.id} value={e?.id}>
                  {e?.name}
                </option>
              );
            })}
          </select>
        )}

        {products && (
          <>
            <table>
              <thead>
                <tr>
                  <td>SKU</td>
                  <td>Title</td>
                  <td>Enchancement Status</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {products?.products?.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>{e?.sku}</td>
                      <td>{e?.title}</td>
                      <td>{e?.enhancement_status}</td>
                      <td>
                        <button onClick={() => getProductDetails(e?.id)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              onClick={() => setUrl(products?.previous)}
              disabled={!products?.previous}
            >
              Prev
            </button>
            <button
              onClick={() => setUrl(products?.next)}
              disabled={!products?.next}
            >
              Next
            </button>
          </>
        )}

        {products && (
          <div>
            <button onClick={() => setNewProduct(!newProduct)}>
              {newProduct ? "close form" : "Add new products"}
            </button>
          </div>
        )}

        {newProduct && (
          <Formik
            initialValues={{
              title: "",
              sku: "",
              price: "",
              year: "",
            }}
            onSubmit={handleCreateNew}
            validationSchema={productSchema}
          >
            <Form>
              <label htmlFor="title">Title :
                <Field name="title" />
              </label>
              <ErrorMessage name="title" component="small" />
              <label htmlFor="sku">SKU : 
                <Field name="sku" />
              </label>
              <ErrorMessage name="sku" component="small" />
              <label htmlFor="price">Price : 
                <Field name="price" />
              </label>
              <ErrorMessage name="price" component="small" />
              <label htmlFor="year">Year :
                <Field name="year" type="number"/>
              </label>
              <ErrorMessage name="year" component="small" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        )}

        {productDetails && (
          <>
            {JSON.stringify(productDetails)}
            <button onClick={() => setProductDetails(null)}>Close</button>
          </>
        )}
      </div>
      <SideBar />
    </>
  );
};

export default Products;
