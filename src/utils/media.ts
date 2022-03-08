import { MediaType, PhotoQuality, launchImageLibrary } from 'react-native-image-picker';
import { ImageProps } from '~/index';
import { isEmpty } from 'lodash';

export const onGetImageFromLibrary = async ({ fileType = 'photo', fileQuality = 0.7,
  maxWidth = 2000, maxHeight = 2000 } = {}): Promise<ImageProps>  => {

  const mediaType: MediaType = <MediaType>fileType;
  const quality: PhotoQuality = <PhotoQuality>fileQuality;
  const options = {
    maxWidth,
    maxHeight,
    mediaType,
    quality
  }

  let image = {};
  const response = await launchImageLibrary(options);
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.errorMessage) {
    console.log('ImagePicker Error: ', response.errorMessage);
  } else {
    if (isEmpty(response.assets)) { 
      console.log('ImagePicker Response Empty');
      return {};
    }
    const { uri, type, fileName, fileSize } = response.assets[0];
    image = { uri, type, fileName, fileSize };
  }
  return image;
}