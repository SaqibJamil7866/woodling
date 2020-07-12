
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import moment from 'moment';

class fileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      filesdata: '',
      imagePreviewUrl: '',
      fileRecords: '',
      imageArray:[],
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    const formData = new FormData(); 

     for (var i = 0; i < this.state.fileRecords.length; i++) {
        formData.append('chat_image_'+i, this.state.fileRecords[i]);  
     }
    formData.append('user_id', 1);
    console.log(formData);


    fetch('http://woodlig.local/controllers/mobile/upload-chat-image.php', {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
    .then((response) => { 

      console.log( response );
      
    });

  }

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
    for (var i = 0; i < file.length; i++) {
 
      // console.log(file[i]);
      var validation = false;
      var isJpgOrPng = file[i].type === 'image/jpeg' || file[i].type === 'image/png';
      console.log(file[i].type);
      console.log(isJpgOrPng);
      if (isJpgOrPng == true) {
          validation = true;

        }
        var isLt2M = file.size / 1024 / 1024 < 2;
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
    console.log(priviewFileArr);


  }
  _handleImageRemove(image,index) {

    var imageList = this.state.imageArray;
        imageList.pop(image); 

    var filedata = this.state.fileRecords;
        filedata.pop(filedata[index]); 

        this.setState({   
          fileRecords: filedata, 
        });

        this.setState({   
          imageArray: imageList, 
        });
  }
componentWillMount() {
      document.title = 'image Upload'
    }

  render() {

    let {imagePreviewUrl} = this.state;
    let imagePreview = null; 
    imagePreview = this.state.imageArray.map((prev,index)=>{ 
                    return  <div><p onClick={this._handleImageRemove.bind(this,prev,index)}>remove</p><img src={prev} width="100"/></div>;
              });
    alert("herea");

    return (
      <div className="form-group">
          <div className="upload-prview-list">
            {imagePreview}
          </div>  
          <input type="file" onChange={this._handleImageChange} multiple /> 
      </div>
    )
  }

}


export default fileUpload;