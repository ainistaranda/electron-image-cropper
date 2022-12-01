import { Link } from 'react-router-dom';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { readFile } from '../../main/helpers';

export default function PhotoCrop() {
  const [imageSrc, setImageSrc] = useState(null); // file data
  const [filename, setFilename] = useState(null); // file address
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleSave = () => {
    //first save the cropped image
    // save cropped image(filename, imageSrc, croppedAreaPixels)
    // then reset for the next photo
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length) {
      // we got a file...
      const file = e.target.files[0];
      setFilename(file.path);
      // get the image data from the file...
      const imageData: any = await readFile(file);
      setImageSrc(imageData);
    }
  };
  if (!imageSrc) {
    return (
      <>
        <h1>Please choose a photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button>
          <Link className="small-btn" to="/">
            {' '}
            &lt; Back
          </Link>
        </button>
      </>
    );
  }
  return (
    <>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
      />
      <button onClick={handleSave} className="save-btn">
        Save
      </button>
    </>
  );
}
