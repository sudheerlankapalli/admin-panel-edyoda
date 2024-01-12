import { useNavigate } from "react-router-dom";
import React ,{useRef, useState}from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';



const AddNewProduct=()=>{
  const storApiData=JSON.parse(localStorage.getItem("apiData"))
const categories=storApiData.productsPage.categories
  const navigate=useNavigate()
  const[formData,setFormData]=useState({
    name:"",
    description:"",
    category:"",
    expireDate:"",
    stock:"",
    unitSold:"0",
    productImg:"",
  })
    const[image,setImage]=useState("")
    const fileInputRef = useRef(null);

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(!image){alert("please upload a image");  return}
      if( storApiData.productsPage.products.some(
        (product) => product.name === formData.name)){
        alert("product alredy exists")
        return
      }
      storApiData.productsPage.products.push(formData)
      localStorage.setItem("apiData", JSON.stringify(storApiData));
      alert("New Product Added Successfully!")
      navigate('/product')
      
    }

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, BMP, SVG, and WEBP files are allowed.');
        return;
      }

      const maxSize = 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        alert('File size cannot exceed 1MB.');
        return;
      }

          const reader = new FileReader();
        reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImage(reader.result);
            setFormData({...formData,productImg:reader.result})
          };
          
        } else {
          setImage("");
        }
      };
    return(
        <div className="form-container">
            <form  onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <div className="newCon">
              <div className="product-detials">
                <div>
                <label>Product Name</label><br/>
                <input type="text" name="name" value={formData.name}  required className='account-input'
                onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
                </div>
                <div>
                    <label>Description</label><br/>
                    <textarea rows="3" name="description" value={formData.description} required
                    className='account-input'
                    onChange={(e)=>setFormData({...formData,description:e.target.value})}></textarea>
                </div>
                <div>
                    <label>Category</label><br/>
                    <select id="category" name="category" value={formData.category} required 
                    className='account-input'
                    onChange={(e)=>setFormData({...formData,category:e.target.value})} >
                      <option value="" >Select category</option>
                      {
                        categories.map((each)=><option key={each} value={each}>{each}</option>)
                      }
                    </select>
                </div>
                <div className="product2-detials">
                <div >
                    <label>Expire Date</label><br/>
                    <input type="date" name="expireDate" value={formData.expireDate}  required
                    className='account-input'
                    onChange={(e)=>setFormData({...formData,expireDate:e.target.value})}/>
                </div>
                <div>
                    <label>Units In Stock</label><br/>
                    <input type="number" name="stock" value={formData.stock}  required 
                    className='account-input'
                    onChange={(e)=>setFormData({...formData,stock:e.target.value})}/>
                </div>
                </div>
                <input type="submit" value="submit" className="button" />
                </div>
                <div className='photo-preview'>
                <div style={{
                backgroundImage: image ? `url(${image})` : "none",
                backgroundColor:image===""?"#aaa" : "transparent",
                border:"1px solid black", padding:image===""?"30%":"50%",
                backgroundSize: "cover"}} className="productPhoto" >
                     {/* {image && <img src={image} alt="Selected" style={{ maxWidth: "100%" }} />} */}
                     { !image &&
                        <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" style={{color: "#ffffff",}} 
                     onClick={handleButtonClick}/>}
                </div>
                <div>
                    <input type="file" id="file upload"  ref={fileInputRef} 
                     style={{display:"none"}}  name="productImg" 
                    onChange={handleFileChange}  />
                    <input type="button"  value="file upload" 
                   className='button' onClick={handleButtonClick} />
                </div>
                </div>
                </div>
            </form> 
        </div>
    )
}

export default AddNewProduct