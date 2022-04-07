import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import getCroppedImg from './cropImage'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import RotateRightIcon from '@mui/icons-material/RotateRight';
//import ImgDialog from './ImgDialog'
import {classes}  from './style'


const CroppedImage = ({file, croppedImages, index}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const dogImg = file

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', {croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  useEffect(() => {
    croppedImages()
  }, [croppedImage])

  return (
    <div style={{position: 'relative' , backgroundColor: '#D3D3D3', color: '#ffff', width: 300, height:300}}>
      <div>
        <Cropper
          image={dogImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={0.5}
          cropSize= {{ width: 300, height: 300 }}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div style={{position: 'absolute', bottom: '0'}}>
        <div style={{display: 'flex',flex: '1', alignItems: 'center',}}>
          <ZoomInIcon/>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            style={{margin: '0px 10px',width:50, color: '#ffff'}}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div style={{display: 'flex',flex: '1', alignItems: 'center',}}>
          <RotateRightIcon/>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            style={{margin: '0px 10px',width:50, color: '#ffff'}}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
      </div>
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
    </div>
  )
}


export default CroppedImage