import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import CustomInput from '@/components/admin/products/CustomInput'
import { PlusIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/solid'
import cookieCutter from "cookie-cutter"
import Spinner from '@/components/common/spinner/Spinner'

function addproduct() {
  const [name, setName] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [image, setImage] = React.useState(null)
  const [image2, setImage2] = React.useState(null)
  const [image3, setImage3] = React.useState(null)
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [selectedImage2, setSelectedImage2] = React.useState(null)
  const [selectedImage3, setSelectedImage3] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange3 = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage3(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append('image', image);
    if(image2){
      formData.append('image2', image2);
    }
    if(image3){
      formData.append('image3', image3);
    }
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', desc);
    formData.append('category', category);

    await fetch('/api/addproduct', {
      method: "POST",
      headers: {
        'authorization': `Bearer ${cookieCutter.get('atkn')}`
      },
      body: formData
    }).then(res => res.json()).then(data => {
      console.log(data)
      setName('')
      setQuantity('')
      setPrice('')
      setDesc('')
      setCategory('')
      setImage(null)
      setImage2(null)
      setImage3(null)
      setSelectedImage(null)
      setSelectedImage2(null)
      setSelectedImage3(null)
      setLoading(false)
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }

  return (
    <AdminLayout title="Add Product">
      <div className='min-h-screen flex justify-center items-center'>
        {loading &&
          <div className='h-screen w-full z-50 fixed top-0 left-0'>
            <Spinner color="green" loading={loading} />
          </div>
        }
        <div className='h-fit bg-green-50 rounded-md backdrop-blur-md p-10 flex flex-col justify-center items-center gap-5'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <div className='w-fit flex justify-center items-center'>
              {!image && <div className='flex flex-col justify-center items-center'>
                <label htmlFor="files" className='w-[80px] h-[80px] flex justify-center items-center bg-white/50 p-2 rounded-md text-white border-slate-500 border-[1px] cursor-pointer'>
                  <PlusIcon className='w-[20px] h-[20px] text-black' />
                </label>
                <input id="files" style={{ visibility: "hidden" }} type="file" accept='image/*' onChange={(e) => {
                  setImage(e.target.files[0]);
                  handleImageChange(e);
                }} />
              </div>}
              {image &&
                <div className='relative'>
                  <XCircleIcon className='h-[25px] w-[25px] text-green-500 absolute top-[-5px] right-[-5px] cursor-pointer' onClick={() => {
                    setImage(null);
                    setSelectedImage(null);
                  }} />
                  <img src={selectedImage} alt="image" className='w-[120px] h-[120px] rounded-sm' />
                </div>
              }
            </div>
            <div className='w-fit flex justify-center items-center gap-3'>
              {!image2 && <div className='flex flex-col justify-center items-center'>
                <label htmlFor="files" className='w-[80px] h-[80px] flex justify-center items-center bg-white/50 p-2 rounded-md text-white border-slate-500 border-[1px] cursor-pointer'>
                  <PlusIcon className='w-[20px] h-[20px] text-black' />
                </label>
                <input id="files" style={{ visibility: "hidden" }} type="file" accept='image/*' onChange={(e) => {
                  setImage2(e.target.files[0]);
                  handleImageChange2(e);
                }} />
              </div>}
              {image2 &&
                <div className='relative'>
                  <XCircleIcon className='h-[25px] w-[25px] text-green-500 absolute top-[-5px] right-[-5px] cursor-pointer' onClick={() => {
                    setImage2(null);
                    setSelectedImage2(null);
                  }} />
                  <img src={selectedImage2} alt="image" className='w-[120px] h-[120px] rounded-sm' />
                </div>
              }
            </div>
            <div className='w-fit flex justify-center items-center gap-3'>
              {!image3 && <div className='flex flex-col justify-center items-center'>
                <label htmlFor="files" className='w-[80px] h-[80px] flex justify-center items-center bg-white/50 p-2 rounded-md text-white border-slate-500 border-[1px] cursor-pointer'>
                  <PlusIcon className='w-[20px] h-[20px] text-black' />
                </label>
                <input id="files" style={{ visibility: "hidden" }} type="file" accept='image/*' onChange={(e) => {
                  setImage3(e.target.files[0]);
                  handleImageChange3(e);
                }} />
              </div>}
              {image3 &&
                <div className='relative'>
                  <XCircleIcon className='h-[25px] w-[25px] text-green-500 absolute top-[-5px] right-[-5px] cursor-pointer' onClick={() => {
                    setImage3(null);
                    setSelectedImage3(null);
                  }} />
                  <img src={selectedImage3} alt="image" className='w-[120px] h-[120px] rounded-sm' />
                </div>
              }
            </div>
          </div>
          <CustomInput name="Name" type="text" setValue={setName} value={name} />
          <CustomInput name="Quantity" type="text" setValue={setQuantity} value={quantity} placeholder="in gm" />
          <CustomInput name="Price" type="text" setValue={setPrice} value={price} placeholder="in Rs" />
          <CustomInput name="Description" type="text" setValue={setDesc} value={desc} />
          {/* <CustomInput name="Category" type="text" setValue={setCategory} value={category} /> */}
          <div className='flex justify-center items-center gap-3'>
            <span className='text-lg text-green-600 font-medium tracking-wider'>Category</span>
            <select className='p-2 outline-none border-green-300 border-[0.5px] rounded-md' onChange={(e) => setCategory(e.target.value)}>
              <option value="">---Select Category---</option>
              <option value="Premium Chicken">Premium Chicken</option>
              <option value="Bakraw Goat Meat">Bakraw Goat Meat</option>
              <option value="Spices">Spices</option>
              <option value="Add-Ons">Add-Ons</option>
            </select>
          </div>
          <span className={`p-2 w-[80px] text-center text-white rounded-md ${(name && category && price && desc && image) ? 'bg-green-500 cursor-pointer' : 'bg-slate-300 cursor-not-allowed'}`} onClick={() => (name && category && price && desc && image) && handleSubmit()}>Add</span>
        </div>
      </div>
    </AdminLayout>
  )
}

export default addproduct