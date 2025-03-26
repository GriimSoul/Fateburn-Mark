import { createSlice} from '@reduxjs/toolkit';
import home from '../Home.png';


const subListSlice = createSlice({
  name: 'subList',
  initialState: {
    subReddits: [{
      title: "Home",
      display_name_prefixed: 'Everything',
      community_icon: home,
      id: 'Nothing is but what is not'
    },
    {
      display_name: 'homestuck',
      title: 'Homestuck',
      display_name_prefixed: 'r/homestuck',
      subscribers: 99850,
      public_description: 'A subreddit for Homestuck, Beyond Canon and the works of Andrew Hussie. The largest, most active Homestuck community. Submit fanart, cosplay and discussions of all kinds!\n\nThe Homestuck Discord exists at https://discord.gg/homestuck if you want to chat with fellow fans.',
      community_icon: 'https://styles.redditmedia.com/t5_2rzgi/styles/communityIcon_el5sjrgoscv71.png?width=256&amp;s=2caed5a4c1af001bfb8da1ab54120bd528827229',
      banner_background_image: 'https://styles.redditmedia.com/t5_2rzgi/styles/bannerBackgroundImage_ieji5m2dfmq61.jpg?width=4000&amp;s=65c17d4ed64b3d7cdb7a5960fe15de29e37cbeec',
      banner_img: 'https://b.thumbs.redditmedia.com/7B9zajm5u5OQxRazlZn4D8Q_zVV3AqQVuCmgTgIlhHU.png'
    },
    {  
      display_name: 'araragi',
      title: 'The Monogatari Series',
      display_name_prefixed: 'r/araragi',
      public_description: 'Come discuss Bakemonogatari, Nisemonogatari, and related series here!\n\nBakemonogatari (化物語 "Ghostory") is a Japanese light novel series written by Nisio Isin (ill. Vofan; pub. by Kodansha under the Kodansha Box imprint). The story centers on Koyomi Araragi, a 3rd-year high school student who finds himself mixed up with all kinds of ghosts, demons, apparitions, and cute girls!',
      community_icon: 'https://styles.redditmedia.com/t5_2tdi5/styles/communityIcon_1ti1sqhhtvh01.png?width=256&amp;s=197d3dca3292900933b9b8c57483b7711d14baaa',
      banner_background_image: 'https://styles.redditmedia.com/t5_2tdi5/styles/bannerBackgroundImage_nasag2051vh01.png?width=4000&amp;s=3e180c22623052e76189ff0919fbc6e865c5452e'
    },
    {
      display_name: 'TWEWY',
      title: 'The World Ends With You',
      display_name_prefixed: 'r/TWEWY',
      public_description: 'Welcome to Shibuya.\n\n\nThis is a subreddit for fans of the Square Enix JRPG The World Ends With You, its anime adaptation, and its sequel, NEO: The World Ends With You.',
      community_icon: 'https://styles.redditmedia.com/t5_2uedf/styles/communityIcon_kcnm43wl0qf61.png?width=256&amp;s=6a7a2d4e971241f86eae2d2b6d06fb7766a96af2',
      banner_background_image: 'https://styles.redditmedia.com/t5_2uedf/styles/bannerBackgroundImage_6gp8wgo501k71.png?width=4000&amp;s=1d1fccc8d304781827371a9ce0c3cd63e5f2b6e9',
      created_utc: 1340918181,
    }
  ],
    subBackUp:[
      {
        title: "Home",
        display_name_prefixed: 'Everything',
        community_icon: home,
        id: 'Nothing is but what is not'
      },
      {
        display_name: 'homestuck',
        title: 'Homestuck',
        display_name_prefixed: 'r/homestuck',
        subscribers: 99850,
        public_description: 'A subreddit for Homestuck, Beyond Canon and the works of Andrew Hussie. The largest, most active Homestuck community. Submit fanart, cosplay and discussions of all kinds!\n\nThe Homestuck Discord exists at https://discord.gg/homestuck if you want to chat with fellow fans.',
        community_icon: 'https://styles.redditmedia.com/t5_2rzgi/styles/communityIcon_el5sjrgoscv71.png?width=256&amp;s=2caed5a4c1af001bfb8da1ab54120bd528827229',
        banner_background_image: 'https://styles.redditmedia.com/t5_2rzgi/styles/bannerBackgroundImage_ieji5m2dfmq61.jpg?width=4000&amp;s=65c17d4ed64b3d7cdb7a5960fe15de29e37cbeec',
        banner_img: 'https://b.thumbs.redditmedia.com/7B9zajm5u5OQxRazlZn4D8Q_zVV3AqQVuCmgTgIlhHU.png'
      },
      {  
        display_name: 'araragi',
        title: 'The Monogatari Series',
        display_name_prefixed: 'r/araragi',
        public_description: 'Come discuss Bakemonogatari, Nisemonogatari, and related series here!\n\nBakemonogatari (化物語 "Ghostory") is a Japanese light novel series written by Nisio Isin (ill. Vofan; pub. by Kodansha under the Kodansha Box imprint). The story centers on Koyomi Araragi, a 3rd-year high school student who finds himself mixed up with all kinds of ghosts, demons, apparitions, and cute girls!',
        community_icon: 'https://styles.redditmedia.com/t5_2tdi5/styles/communityIcon_1ti1sqhhtvh01.png?width=256&amp;s=197d3dca3292900933b9b8c57483b7711d14baaa',
        banner_background_image: 'https://styles.redditmedia.com/t5_2tdi5/styles/bannerBackgroundImage_nasag2051vh01.png?width=4000&amp;s=3e180c22623052e76189ff0919fbc6e865c5452e'
      },
      {
        display_name: 'TWEWY',
        title: 'The World Ends With You',
        display_name_prefixed: 'r/TWEWY',
        public_description: 'Welcome to Shibuya.\n\n\nThis is a subreddit for fans of the Square Enix JRPG The World Ends With You, its anime adaptation, and its sequel, NEO: The World Ends With You.',
        community_icon: 'https://styles.redditmedia.com/t5_2uedf/styles/communityIcon_kcnm43wl0qf61.png?width=256&amp;s=6a7a2d4e971241f86eae2d2b6d06fb7766a96af2',
        banner_background_image: 'https://styles.redditmedia.com/t5_2uedf/styles/bannerBackgroundImage_6gp8wgo501k71.png?width=4000&amp;s=1d1fccc8d304781827371a9ce0c3cd63e5f2b6e9',
        created_utc: 1340918181,
      }  
    ],
    selectedSubreddit: 'Everything',

  },
  reducers: {
    addSubreddit: (state, action) => {
      state.subReddits.push(action.payload);
      state.subBackUp.push(action.payload);
    },
    removeSubreddit: (state, action) => {
      state.subReddits = state.subReddits.filter(sub => sub.display_name_prefixed !== action.payload.display_name_prefixed);
      //state.selectedSubreddit = 'Everything';
    },
    selectSubReddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    }
  }
});

export const { addSubreddit, removeSubreddit, selectSubReddit } = subListSlice.actions;
export default subListSlice.reducer;
