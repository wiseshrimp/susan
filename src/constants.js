import Startup from './assets/sounds/startup.wav'
import Notification from './assets/sounds/notification.ogg'
import StartupDistorted from './assets/sounds/startup_distorted.mp3'

const SOUNDS = [
  {
    name: 'startup',
    sound: Startup,
    type: 'wav'
  },
  {
    name: 'notification',
    sound: Notification,
    type: 'ogg'
  },
  {
    name: 'startupDistorted',
    sound: StartupDistorted,
    type: 'mp3'
  }
]

const VIDEOS = {
    openingVideo: 'openingVideo',
    photosOpeningVideo: 'photosOpeningVideo',
    emptyRoomVideo: 'emptyRoomVideo',
    endEmptyRoomVideo: 'endEmptyRoomVideo',
    endPrivateVideo: 'endPrivateVideo',
    privateFolderVideo: 'privateFolderVideo',
    treeVideo: 'treeVideo',
    battery: 'battery',
    wifi: 'wifi',
    finder: 'finder',
    trash: 'trash',
    clockBeginning: 'clockBeginning',
    clockEnd: 'clockEnd',
    apple: 'apple',
    safariOpening: 'safariOpening',
    safariWork: 'safariWork',
    safariWorkEnd: 'safariWorkEnd',
    safariBing: 'safariBing',
    updateNotification0: 'updateNotification0',
    updateNotification1: 'updateNotification1',
    updateNotification2: 'updateNotification2',
    updateNotification3: 'updateNotification3',
    preUpdate: 'preUpdate',
    endingSequence: 'endingSequence',
    newSusan: 'newSusan',
    zoom: 'zoom'
  }

  const UPDATE_VIDEOS = [
    VIDEOS.updateNotification0,
    VIDEOS.updateNotification1,
    VIDEOS.updateNotification2,
    VIDEOS.updateNotification3,
    VIDEOS.preUpdate,
    VIDEOS.endingSequence,
    VIDEOS.newSusan
  ]
  
  const POPUPS = {
    PHOTOS: 'Photos',
    SAFARI: 'Safari',
    QUERETARO: 'Queretaro',
    PRIVATE: 'Private',
    TREE: 'Tree',
    FULLSCREEN: 'Fullscreen',
    CLOCK: 'Clock'
  }
  
  const VIDEO_LINKS = {
    openingVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/OpeningCut.webm",
    privateFolderVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_Private.webm",
    photosOpeningVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_Opening_Cut.webm",
    emptyRoomVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_EmptyRoom.webm",
    endEmptyRoomVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_EmptyRoom_EnoughOfThat_1.webm",
    endPrivateVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_Private_End_1.webm",
    apple: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Apple.webm",
    clockBeginning: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/ClockBeginning.webm",
    clockEnd: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Clock_End.webm",
    battery: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TopBar_Battery_1.webm",
    wifi: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TopBar_WiFiCut.webm",
    finder: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TopBar_FinderCut.webm",
    trash: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/TrashCut.webm", 
    treeVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Photos_TreesCut1.webm",
    safariOpening: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Safari_Opening.webm",
    safariWork: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Safari_Work.webm",
    safariWorkEnd: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Safari_WorkEnd.webm",
    safariBing: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Safari_BingCut.webm",
    updateNotification0: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/UpdateNotification0.webm',
    updateNotification1: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/UpdateNotification1.webm',
    updateNotification2: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/UpdateNotification2.webm',
    updateNotification3: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/UpdateNotification3.webm',
    preUpdate: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/PreUpdate.webm',
    endingSequence: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Updating_Glitch.webm',
    newSusan: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/New_Susan.webm',
    zoom: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/Zoom.webm'
  }

  const CAPTION_VIDEO_LINKS = {
    openingVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Opening.mp4",
    privateFolderVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_PrivateFolder.mp4",
    photosOpeningVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_PhotosOpening.mp4",
    emptyRoomVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_EmptyRoom.mp4",
    endEmptyRoomVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_EmptyRoomEnd.mp4",
    endPrivateVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_PrivateFolderEnd.mp4",
    apple: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Apple.mp4",
    clockBeginning: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_ClockStart.mp4",
    clockEnd: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_ClockEnd.mp4",    
    battery: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Battery.mp4",
    wifi: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Wifi.mp4",
    finder: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Finder.mp4",
    trash: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Trash.mp4", 
    treeVideo: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Trees.mp4",
    safariOpening: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_SafariOpening.mp4",
    safariWork: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Work.mp4",
    safariWorkEnd: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_WorkEnd.mp4",
    safariBing: "https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Bing.mp4",
    updateNotification0: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Update0.mp4',
    updateNotification1: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Update1.mp4',
    updateNotification2: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Update2.mp4',
    updateNotification3: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Update3.mp4',
    preUpdate: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_PreUpdate.mp4',
    endingSequence: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_EndingFull.mp4',
    newSusan: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_NewSusan.mp4',
    zoom: 'https://sues-website.s3.us-east-2.amazonaws.com/internetgirl/captions/Captions_Zoom.mp4'
  }

const POPUP_VIDEOS = {
  [POPUPS.PHOTOS]: [VIDEOS.photosOpeningVideo, VIDEOS.endPrivateVideo, VIDEOS.endEmptyRoomVideo],
  [POPUPS.SAFARI]: [VIDEOS.safariWork, VIDEOS.safariWorkEnd, VIDEOS.safariBing, VIDEOS.safariOpening],
  [POPUPS.QUERETARO]: [VIDEOS.emptyRoomVideo],
  [POPUPS.PRIVATE]: [VIDEOS.privateFolderVideo],
  [POPUPS.TREE]: [VIDEOS.treeVideo],
  [POPUPS.FULLSCREEN]: [],
  [POPUPS.CLOCK]: [VIDEOS.clockBeginning, VIDEOS.clockEnd]
}

  export {VIDEOS, POPUPS, VIDEO_LINKS, UPDATE_VIDEOS, POPUP_VIDEOS, SOUNDS, CAPTION_VIDEO_LINKS}