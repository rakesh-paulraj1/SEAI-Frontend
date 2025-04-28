import { useState } from "react";
import { Layout } from "@/components/Layout";
import axios from "axios";
import { set } from "date-fns";
const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  interface MedicineResponse {
    data: any;
    medicine_name: string;
    active_ingredients: string[];
    use_cases: string[];
  }

  const [response, setResponse] = useState<MedicineResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview image
    }
  };

 
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
    setLoading(true);
   const data=new FormData();
   if(!image) return;
   data.append("file",image);
  const backendurl=import.meta.env.VITE_BACKENDURL;
   const response=await axios.post(`${backendurl}/getresponse`,data,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    console.log(response.data);
if(response.data.message=="fail")
{
  setLoading(false);
  setError("Error: "+response.data.message);
}
console.log(response.data.message=="success");
if(response.data.message=="success"){
  setLoading(false);
  setResponse(response.data);
  alert("Response returned correctly!");
}
else{
  setLoading(false);
  setError("Error: "+response.data.message);
  alert("Error: "+response.data.message);

}



  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Upload Image of The Medicine</h2>

        {/* Image Upload Box */}
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition-all duration-300"
        >
          {preview ? (
            <img src={preview} alt="Uploaded preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V12M7 12V8M7 12H3m4 0h4m4 4V8m0 8v-4m0 4h4m-4 0H9" />
              </svg>
              <p className="mt-2 text-gray-600 text-sm">Click to upload an image</p>
            </div>
          )}
        </label>
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

        {/* Buttons */}
        <div className="mt-4 flex gap-4">
          {preview && (
            <button onClick={() => { setImage(null); setPreview(null); }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
              Remove Image
            </button>
          )}

          <button onClick={handleUpload} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300" disabled={loading}>
            {loading ? "Uploading..." : "Upload & Analyze"}
          </button>
        </div>

        {/* Response Display */}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {response && (  <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl">
          <div className="text-xl font-bold">Medicine Details</div>
          <div className="mt-2">
            <strong>Name:</strong> {response.data.medicine_name}
          </div>
          <div className="mt-2">
            <strong>Active Ingredients:</strong>
            {response.data.active_ingredients?.map((item: string, index: number) => (
              <div key={index}>{item}</div>
            ))}
          </div>
          <div className="mt-2">
            <strong>Use Cases:</strong>
            {response.data.use_cases?.map((item: string, index: number) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>

        )}
      </div>
    </Layout>
  );
};

export default Index;