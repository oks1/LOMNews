import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../redux/features/news/singleNewsSlice';
import axios from "../utils/axios.js";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"
export const AddNews = () => {

const [title, setTitle] = useState('');
const [newsText, setNewsText] = useState('');
const [image, setImage] = useState('');
const [tags, setTags] = useState('');
const [category, setCategory] = useState('');
// const [file, setFile] = useState()



  // useEffect(() => {
  //   const getCats = async () => {
  //     const res = await axios.get("/categories");
  //     setCategory(res.data);
  //     // console.log(setCats);
  //   };
  //   getCats();
  // }, []);

// const options = Array.from(category).map((name, _id)=>{
// return <option key={_id} value={_id}>{name}</option> 
// }
// )


// const fileSelected = event => {
//   const file = event.target.files[0]
//   setFile(file)
// }

const dispatch = useDispatch()
const navigate = useNavigate()

const submitHandler = () => {
  try {
      const data = new FormData()
      data.append('title', title)
      data.append('newsText', newsText)
      data.append('image', image)
      // data.append('image', file)
      data.append('tags', tags)
      data.append('category', category)
      dispatch(createNews(data))
      navigate('/')
  } catch (error) {
      console.log(error)
  }
}

// const fileSelected = event => {
//   const file = event.target.files[0]
//   setFile(file)
// }

const clearFormHandler = () => {
  setNewsText('')
  setTitle('')
  setTags('')
  setCategory('')
}


  return (

    <div class="add_a_comment">
    <div class="single_media_title"><h2>Add a News</h2></div>
    <div class="comment_form" >
      <form onSubmit={(e)=> e.preventDefault()}>
                      <div class="form-group">
                        {/* <label>Upload a picture  */}

                        <input type="file"  class="custom-file-input" onChange={(e)=>setImage(e.target.files[0])}/>
                        {/* </label> */}
                        <div>{image && (<img src={URL.createObjectURL(image)} alt={image.name} />)}</div>
                      </div>
                      <div class="form-group">
                        {/* <label>News Title  */}
                        <input onChange={(e)=>setTitle(e.target.value)} class="form-control" value={title} type="text" placeholder = 'Title'/>
                        {/* </label> */}
                      </div>
                      <div class="form-group comment">
                      {/* <label>Body  */}

                          <textarea class="form-control" onChange={(e)=>setNewsText(e.target.value)}  value={newsText} placeholder = 'Body of the news'/>
                          {/* </label> */}

                      </div>
                      <div class="form-group comment">
                      {/* <label>Tags  */}
  <input class="form-control" onChange={(e)=>setTags(e.target.value)}value={tags} type="text" placeholder = 'Tags'/>
  {/* </label> */}
                      </div>
                     <div class="my-4">
                     <h6>Select category: </h6>
                     </div>
                      

                      <div class="form-check form-check-inline">
<input class="form-check-input" type="radio"name="inlineRadioOptions"  id="canada" onChange={(e)=>setCategory(e.target.value)} value="6331d6e4d2ef306f243daaa5"/>
  <label  class="form-check-label" for="canada">Canada</label>
</div>
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="world" onChange={(e)=>setCategory(e.target.value)} value="6331d6d2d2ef306f243daaa3"/>
  <label for="world">World</label>
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="business" onChange={(e)=>setCategory(e.target.value)} value="6331d6bdd2ef306f243daaa1"/>
  <label for="business">Business</label>
  
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="health" onChange={(e)=>setCategory(e.target.value)} value="6331d6a3d2ef306f243daa9f"/>
  <label for="health">Health</label>
  
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="science" onChange={(e)=>setCategory(e.target.value)} value="6331d68dd2ef306f243daa9d"/>
  <label for="science">Science</label>
  
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="technology" onChange={(e)=>setCategory(e.target.value)} value="6331d673d2ef306f243daa9b"/>
  <label for="technology">Technology</label>
  

  <input class="form-check-input" type="radio"name="inlineRadioOptions"  id="politics" onChange={(e)=>setCategory(e.target.value)} value="6331d659d2ef306f243daa99"/>
  <label for="politics">Politics</label>

  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="sport" onChange={(e)=>setCategory(e.target.value)} value="6331d5e637feccc826630085"/>
  <label for="sport">Sport</label>

  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="entertainment" onChange={(e)=>setCategory(e.target.value)} value="6331cc3da76829cd3e80f7e6"/>
  <label for="entertainment">Entertainment</label>

          <div class="d-flex flex-row gap-2 mt-4">

                    
                        <button  type='submit' onClick={submitHandler} class="btn btn-submit btn-dark"> Add </button>
                        {/* </div>
                        <div class="d-grid gap-2 m-5"> */}
                        <button onClick={clearFormHandler} class="btn btn-submit btn-dark "> Cancel </button>
                        </div>
                  </form>
                </div>
                <div class="copyright-section footer_section section_wrapper section_wrapper">
         <div class="container-fluid">
           <div class="row">
             <div class="col-md-3">
             </div>
             <div class="col-md-7">
               <div class="copyright">
               © Copyright 2022 - LOMNEWS. Developed by: Liutsiia, Oxana, Myrzagul</div>
             </div>
             <div class="col-md-2">
             </div>
           </div>
         </div>
       </div>
  </div>
  

  );
};
