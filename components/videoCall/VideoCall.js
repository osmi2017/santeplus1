  // CORE-SDK
  import AgoraUIKit from 'agora-rn-uikit';

  const VideoCall = () => {
    const connectionData = {
      appId: 'e7f6e9aeecf14b2ba10e3f40be9f56e7',
      channel: 'test',
      token: null, // enter your channel token as a string 
      };
    return(
      <AgoraUIKit connectionData={connectionData} />
      )
  }

  export default VideoCall; 