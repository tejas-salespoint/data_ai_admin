/* eslint-disable react/prop-types */

import ImageGallery from "./ImageGallery"

const MediaComponent = ({setImageId,imageId}) => {

  return (
    <div className="px-6 space-y-6">
    <ImageGallery setImageId={setImageId} imageId={imageId} />
  </div>
  )
}
export default MediaComponent