import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import ReactPlayer from 'react-player'; 
import PostActionComponent from '../component/PostActionComponent';   
import SimplePostModel from '../component/models/SimplePostModel';  
import ImagePostModel from '../component/models/ImagePostModel'; 

import {ActivityStreamService} from '../services/ActivityStreamService';  
import {ActivityStremTextItems} from '../component/items/ActivityStremTextItems';  

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FileUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadType:this.props.uploadType,
      file: '',
      filesdata: '',
      imagePreviewUrl: '',
      fileRecords: '',
      imageArray:[],
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    
  }

  /*_handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    const formData = new FormData(); 

     for (var i = 0; i < this.state.fileRecords.length; i++) {
        formData.append('chat_image_'+i, this.state.fileRecords[i]);  
     }
    formData.append('user_id', 1);
     


    fetch('http://woodlig.local/controllers/mobile/upload-chat-image.php', {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
    .then((response) => { 

      
      
    });

  }*/

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    var file = e.target.files;

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
     this.setState({
          filesdata:'',
        });
     this.setState({
          filesdata:file,
        });

    // console.log(file.length);
    var fileArr = [];
    var priviewFileArr = [];
    var uploadType = this.props.uploadType;
    var mxsize = this.props.mxsize;
    for (var i = 0; i < file.length; i++) {
 
      // console.log(file[i]);
      var validation = false;
       if(uploadType == 'image'){
            var isJpgOrPng = file[i].type === 'image/jpeg' || file[i].type === 'image/png';
            if (isJpgOrPng == true) {
              validation = true;
            }else{
                toast.error("Please upload only jpg,png,jpeg files")
            }
       } 
       if(uploadType == 'video'){ 
           validation = true;
       }
        var isLt2M = file.size / 1024 / 1024 < mxsize;
        if (isLt2M == true) {
            validation = true;
        }

        if ( validation ) {
          fileArr.push( file[i] ); 
        } 
    }

        const files = fileArr; 
        /* Map each file to a promise that resolves to an array of image URI's */ 
        Promise.all(files.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
        .then(images => { 
            /* Once all promises are resolved, update state with image URI array */
            this.setState({ imageArray : images })

        }, error => {        
            console.error(error);
        });
    this.setState({
      fileRecords:fileArr,
    });
    this.props.sendCallBack(fileArr); 
     


  }
  _handleImageRemove(image,index) {

    var imageList = this.state.imageArray;
        imageList.splice(index, 1); 
    var filedata = this.state.fileRecords; 
        filedata.splice(index, 1); 
        this.setState({   
          fileRecords: filedata, 
        });

        this.setState({   
          imageArray: imageList, 
        });

    this.props.sendCallBack(filedata);    
  }
componentWillMount() {
      document.title = 'image Upload'
    }

  render() {

    let {imagePreviewUrl} = this.state;
    let imagePreview = null; 
    if(this.state.uploadType == 'image'){
       imagePreview = this.state.imageArray.map((prev,index)=>{ 
                    return  <div><p onClick={this._handleImageRemove.bind(this,prev,index)}>remove</p><img src={prev} width="100"/></div>;
              }); 
    }else{

       imagePreview = this.state.imageArray.map((prev,index)=>{  
                    return  <div className="post-video-prev"> <ReactPlayer url={prev} width="400" controls/></div>;
              });  
    }
   
    return (
      <div className="form-group text-center">
          <ToastContainer />  
          <div className="upload-prview-list">
            {imagePreview}
             
          </div> 
            { this.state.imageArray.length == 0 && 
                <div className="form-group">
                   <img src={require('../assets/img/upload-img.png')} alt="Upload Image" className="" style={{'width': '40%','margin': 'auto','display': 'block' }} />
                </div>
            } 
            { this.state.uploadType != "video" &&
              <div>
                 <input type="file" multiple className="inputfile inputfile-1" onChange={this._handleImageChange}/>
                 <label><i class="fas fa-plus-circle"></i><span>Choose a file…</span></label>
              </div>
            } 
            { this.state.uploadType == "video" &&
              <div>
                 <input type="file" className="inputfile inputfile-1" onChange={this._handleImageChange}/>
                 <label><i class="fas fa-plus-circle"></i><span>Upload Video</span></label>
              </div>
            }  
       </div>
    )
  }

}
 
export default FileUploadComponent