
import React, { useEffect, useState } from "react";

function ProductManagement() {
const [products, setProducts] = useState([]);
const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });


const fetchProductos = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://redes-xsapi.parachico.xyz/productos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
            const data = await response.json();
            setProducts(data);
        } else {
            console.error("Error al obtener los productos", response.statusText);
        }
    } catch (error) {
        console.error("Error del servidor: ", error);
    }
};

useEffect(() => {
   fetchProductos();
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };


  const deleteProduct = async (id) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`https://redes-xsapi.parachico.xyz/productos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log("El producto fue eliminado con exito");
            fetchProductos();
            alert("El producto se elimino con exito");
        } else {
            console.error("Error al eliminar el producto", response.statusText);
        }
    } catch (error) {
        console.error("Error en el servidor", error);
    }
  }

  const addProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
       try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://redes-xsapi.parachico.xyz/productos", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: newProduct.name,
                precio: newProduct.price,
                descripcion: newProduct.description,
            }),
         });
    
         if (response.ok) {
            const result = await response.json();
            console.log("El producto fue agregado con exito ", result);
            alert("eL producto se agrego con exito ");

            setNewProduct({ name: "", price: "", description: "" });

            fetchProductos();
         } else {
            console.error("Error al agregar el producto", response.statusText)
         }
       } catch (error) {
        console.error("Error del servidor: ", error);
       }
    }
  };

const logout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
}

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f4f4f4" }}>
      <header style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Gestión de Productos</header>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Ingrese el nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Ingrese el precio del producto"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Ingrese la descripción del producto"
          value={newProduct.description}
          onChange={handleInputChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button
          onClick={addProduct}
          style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}
        >
          Agregar Producto
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Nombre</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Precio</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_productos}>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{product.id_productos}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{product.nombre}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}> ${parseFloat(product.precio).toFixed(2)}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{product.descripcion}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
              <button
               onClick={() => deleteProduct(product.id_productos)}
               style={{
                padding: "8px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                cursor: "pointer",
                }}
                >
                Eliminar
                </button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "80px", textAlign: "center" }}>
      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Cerrar sesión
      </button>
    </div>
    </div>

    
  );
}

export default ProductManagement;
