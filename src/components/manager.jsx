import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const manager = () => {
  const ref = useRef();
  const passwardref = useRef();
  const [passwardarray, setpasswardarray] = useState([]);
  const [copiedTooltip, setCopiedTooltip] = useState('');

  const getpasswards = async () => {
    let req = await fetch("http://localhost:3000/");
    const passwards = await req.json();
    setpasswardarray(passwards);
  }

  useEffect(() => {
    getpasswards();

  }, []);

  const savepassward = async () => {
    if (form.site.length < 3 || form.user.length < 3 || form.pass.length < 3) {
      toast.error("Fill all fields properly");
      return;
    }


    if (form.id) {
      const res = await fetch(`http://localhost:3000/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: form.site,
          user: form.user,
          pass: form.pass
        })
      });
      const data = await res.json();
      if (data.success) toast.success("Password updated");
      else toast.error("Update failed");
    }

    else {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) toast.success("Password saved");
      else toast.error("Save failed");
    }


    setform({ site: "", user: "", pass: "", id: "" });
    getpasswards();
  };


  const deletepassward = async (id) => {
    console.log("Deleting passward with id:", id);
    let c = window.confirm("Are you sure you want to delete this passward?");
    if (!c) {
      return;
    }
    const updatedArray = passwardarray.filter((item) => item._id !== id);
    setpasswardarray(updatedArray);
    await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE"
    });



    toast('Passward deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  }
  const editpassward = (id) => {
    const itemToEdit = passwardarray.find((i) => i._id === id);
    if (!itemToEdit) {
      toast.error("Item not found");
      return;
    }
    setform({
      site: itemToEdit.site,
      user: itemToEdit.user,
      pass: itemToEdit.pass,
      id: itemToEdit._id
    });
  };



  const [form, setform] = useState({
    site: "",
    user: "",
    pass: ""
  })

  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value

    })
  }


  const showpassward = () => {
    passwardref.current.type = "text";
    if (ref.current.src.includes("eyeclose.svg")) {
      ref.current.src = "eyeopen.svg";
      passwardref.current.type = "password";
    }
    else {
      ref.current.src = "eyeclose.svg";
      passwardref.current.type = "text";
    }
  }

  const copytext = (textToCopy, id, e) => {
    toast('Text copied successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    const btn = e.currentTarget;
    const img = btn.querySelector("img");
    const originalSrc = img.src;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopiedTooltip(id);

        btn.classList.add("bg-purple-600");
        img.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='20 6 9 17 4 12'%3e%3c/polyline%3e%3c/svg%3e";

        setTimeout(() => {
          btn.classList.remove("bg-purple-600");
          img.src = originalSrc;
        }, 1500);

        setTimeout(() => {
          setCopiedTooltip('');
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };




  return (
    <div className="h-[80vh] overflow-y-auto relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className="  absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"> </div>
      < div className='flex  gap-2 text-center justify-center items-center'>
        <span className='text-green-700 text-3xl'>&lt;</span>
        <div>
          <span className='font-bold text-4xl text-fuchsia-800'>Pass</span><span className='font-bold text-red-800 text-2xl'>Guard</span>
        </div>
        <span className='text-green-700 text-3xl'>/&gt;</span>
      </div>
      <p className=' font-bold text-xl text-center p-2'>Your own password manager</p>
      <div className="  mx-auto w-[55vw] p-4  items-center rounded-lg flex flex-col gap-4">
        <input value={form.site} onChange={handlechange} placeholder='Enter website URL ' className=' w-full border border-gray-600  text-black rounded-full px-3 ' name='site' type="text" />
        <div className="flex gap-10 w-full">
          <input value={form.user} onChange={handlechange} placeholder='Enter user name' className='w-full border border-gray-600  text-black rounded-full px-3 ' name='user' type="text" />
          <div className="relative w-full  flex ">
            <input ref={passwardref} value={form.pass} onChange={handlechange} placeholder='Enter password' className='w-full border border-gray-600  text-black rounded-full px-3 ' name='pass' type="password" />
            <span className='absolute py-1 w-5 right-3' onClick={showpassward}><img ref={ref} src="eyeopen.svg" alt="eye" /></span>

          </div>
        </div>

        <button onClick={savepassward} className='bg-purple-500  text-white border-2 border-purple-700 px-4 py-1 rounded-full w-52 hover:bg-purple-700 transition-colors duration-300'>
          <div className='flex gap-2 justify-center items-center'>
            <lord-icon className="font-extrabold" src="https://cdn.lordicon.com/tsrgicte.json" trigger="hover" ></lord-icon>
            <span className='font-bold text-black text-lg'>Add Password</span>
          </div>
        </button>
      </div>
      <div className="showpasswards  h-[42vh] items-center mx-auto w-[60vw] p-4  rounded-lg flex flex-col gap-4 ">
        < div className='flex  gap-2 items-center'>

          <div>
            <span className='font-bold text-4xl text-cyan-400'>Your</span><span className='font-bold text-[#C0C0C0] text-2xl'> Passwords</span>
          </div>
        </div>
        {passwardarray.length === 0 && <p className='text-gray-600 font-semibold'>No passwords saved yet.</p>}
        {passwardarray.length > 0 &&
          <div className="overflow-y-auto hide-scrollbar no-scrollbar  w-full flex-1">
            <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
              <thead className="bg-purple-100 sticky top-0 z-10">
                <tr>
                  <th className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 px-4 py-3 text-left  text-lg font-bold text-gray-700">
                    Site
                  </th>
                  <th className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 px-4 py-3 text-left text-lg  font-bold text-gray-700">
                    User
                  </th>
                  <th className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 px-4 py-3 text-left text-lg  font-bold text-gray-700">
                    Password
                  </th>
                  <th className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 px-4 py-3 text-left text-lg  font-bold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-sm text-gray-700 bg-white ">
                {passwardarray.map((item, index) =>

                  <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200 ">
                    <td className="px-4 py-2 text-left flex gap-2 font-mono text-gray-600  items-center"> <a href={item.site} target="_blank">{item.site}</a>
                      <div className="relative">
                        <button onClick={(e) => copytext(item.site, `site-${index}`, e)} className='w-8 cursor-pointer p-2  '><img src="copy.png" alt="" /></button>
                        {copiedTooltip === `site-${index}` && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs z-10">
                            Copied!
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-left  gap-2 font-mono text-gray-600 items-center">{item.user}
                      <div className='relative inline-block'>
                        <button onClick={(e) => copytext(item.user, `user-${index}`, e)} className='w-8 cursor-pointer p-2 '><img src="copy.png" alt="" /></button>
                        {copiedTooltip === `user-${index}` && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs z-10">
                            Copied!
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-left font-mono text-gray-600  gap-2 items-center "> {"*".repeat(item.pass.length)}
                      <div className='relative inline-block'>
                        <button onClick={(e) => copytext(item.pass, `pass-${index}`, e)} className='w-8 cursor-pointer p-2 '><img src="copy.png" alt="" /></button>
                        {copiedTooltip === `pass-${index}` && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs z-10">
                            Copied!
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => {
                        deletepassward(item._id);
                      }} className=' text-white px-3 py-1 rounded-full transition-colors duration-300'>
                        <img className='w-5' src="delete.png" alt="" />
                      </button>
                      <button onClick={() => {
                        editpassward(item._id);
                      }} className=' text-white  py-1 rounded-full transition-colors duration-300'>
                        <img className='w-5' src="edit.png" alt="" />
                      </button>
                    </td>



                  </tr>
                )}

              </tbody>

            </table>
          </div>
        }

      </div>
    </div>

  )
}

export default manager