export type MemoryCategory = 'all' | 'couple' | 'muse' | 'photobooth';

export interface PhotoMemory {
  id: string;
  src: string;
  title: string;
  caption: string;
  dateLabel: string;
  category: Exclude<MemoryCategory, 'all'>;
  featured?: boolean;
  aspectClass?: string;
}

export interface VideoMemory {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  orientation: 'portrait' | 'landscape';
  poster?: string;
}

const assetUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}assets/aistudio/${filename}`;

export const HERO_PORTRAIT_MAIN = assetUrl(
  'att.vCEl_vlAmedE50cwX9yQFVvl5-vXc5M27bANrNSExAw_bc2125fe.jpg',
);

export const HERO_COUPLE_INSET = assetUrl('IMG_7619_ff08dd1b.jpg');

export const KISS_REVEAL_PHOTO = assetUrl(
  '1795018273435_63748038427597991_6914075304245760694_71610c91b5c3a084b348a359476b6602_7f18cd9b.jpg',
);

export const PHOTO_MEMORIES: PhotoMemory[] = [
  {
    id: 'm1',
    src: assetUrl('IMG_7619_ff08dd1b.jpg'),
    title: 'Bên nhau thật gần',
    caption: 'Khoảnh khắc bình yên nhất chẳng cần đi đâu xa, chỉ cần ngồi sát cạnh nhau như thế này.',
    dateLabel: 'Đôi mình · Kỷ niệm',
    category: 'couple',
    featured: true,
  },
  {
    id: 'm2',
    src: assetUrl('att.vCEl_vlAmedE50cwX9yQFVvl5-vXc5M27bANrNSExAw_bc2125fe.jpg'),
    title: 'Nàng thơ áo dài hồng',
    caption: 'Nụ cười rạng rỡ bên nhành hoa bách hợp — cô gái dịu dàng nhất trong lòng anh.',
    dateLabel: 'Nàng thơ · Áo dài',
    category: 'muse',
    featured: true,
  },
  {
    id: 'm3',
    src: assetUrl('1795018273487_63748038427597991_6914075304245760694_94e6c6f05f1ae88cd131831ceab3f0a9_434c16a4.jpg'),
    title: 'Cái ôm qua gương',
    caption: 'Chiếc bờm tai cáo và tai mèo hồng, còn ánh mắt em nhìn vào khung hình thật ngọt.',
    dateLabel: 'Photobooth · Gương',
    category: 'photobooth',
    featured: true,
  },
  {
    id: 'm4',
    src: assetUrl('1795018273394_63748038427597991_6914075304245760694_dd6aafc316714dcaebe6d969af3d7db0_3a36cb8c.jpg'),
    title: 'Tựa vai bình yên',
    caption: 'Màu đỏ rượu ấm áp làm nền cho cái ôm thật chặt của chúng mình.',
    dateLabel: 'Photobooth · Studio',
    category: 'photobooth',
  },
  {
    id: 'm5',
    src: assetUrl('IMG_7646_c37068b6.jpg'),
    title: 'Nắm chặt tay em',
    caption: 'Bàn tay nhỏ xinh và chiếc nhẫn lấp lánh — nắm lấy rồi là không muốn buông đâu.',
    dateLabel: 'Đôi mình · Dịu dàng',
    category: 'couple',
  },
  {
    id: 'm6',
    src: assetUrl('1795018273456_63748038427597991_6914075304245760694_9d87e30355a4a34b7d9cb7ef723de384_954e78df.jpg'),
    title: 'Cáo nhỏ & Mèo hồng',
    caption: 'Nựng má em một cái nhẹ, dù hơi phụng phịu vẫn đáng yêu hết phần thiên hạ.',
    dateLabel: 'Photobooth · Vui vẻ',
    category: 'photobooth',
  },
  {
    id: 'm7',
    src: assetUrl('att.kw8lqKiRYOxhzWe9_ao0NdXgH-U-cHIvXnb5Yk0511M.png_14122464.jpeg'),
    title: 'Ánh nhìn trong veo',
    caption: 'Đôi mắt tròn xoe sau cặp kính mảnh — lúc nào nhìn em tim anh cũng lỡ một nhịp.',
    dateLabel: 'Nàng thơ · Chân dung',
    category: 'muse',
  },
  {
    id: 'm8',
    src: assetUrl('IMG_6577_fd742dcc.JPG'),
    title: 'Cùng tone đen thật ngầu',
    caption: 'Đứng cạnh nhau trước gương, em nhỏ nhắn đứng kế bên khiến khung hình đẹp lạ thường.',
    dateLabel: 'Đôi mình · Outfit',
    category: 'couple',
  },
  {
    id: 'm9',
    src: assetUrl('1795018273471_63748038427597991_6914075304245760694_18a5c0c7ac32de961a420541c0a9adf5_ed969eb0.jpg'),
    title: 'Nụ cười sáng bừng',
    caption: 'Chỉ một nụ cười nhẹ của Ín Nhi cũng đủ làm cả ngày hôm đó của anh rực rỡ.',
    dateLabel: 'Photobooth · Kỷ niệm',
    category: 'photobooth',
  },
  {
    id: 'm10',
    src: assetUrl('1795018273525_63748038427597991_6914075304245760694_eef8ddd3cba5d4978f76ef9ebefbc7b7_a2c11ac9.jpg'),
    title: 'Lấp lánh ánh nhũ',
    caption: 'Gương mặt xinh xắn điểm chút nhũ mắt long lanh như sao trời.',
    dateLabel: 'Nàng thơ · Long lanh',
    category: 'muse',
  },
  {
    id: 'm11',
    src: assetUrl('IMG_7618_8150d97b.jpg'),
    title: 'Chung một khung hình',
    caption: 'Hai cặp kính kề sát nhau, ảnh chụp vội nhưng lại lưu giữ trọn vẹn niềm vui.',
    dateLabel: 'Đôi mình · Ngẫu hứng',
    category: 'couple',
  },
  {
    id: 'm12',
    src: assetUrl('1795018273538_63748038427597991_6914075304245760694_89c0ac5b71c0e1b2366cf3381303951d_998ceaef.jpg'),
    title: 'Em và bé cún trắng',
    caption: 'Mỗi khi em gặp cún con là đôi mắt lại sáng rực và cười tít cả lên.',
    dateLabel: 'Nàng thơ · Dạo phố',
    category: 'muse',
  },
  {
    id: 'm13',
    src: assetUrl('IMG_7629_3d6d8d5c.jpg'),
    title: 'Chiều tan học',
    caption: 'Phản chiếu qua ô cửa kính dãy tủ đồ, một buổi chiều bình dị nhưng nhớ mãi.',
    dateLabel: 'Đôi mình · Trường học',
    category: 'couple',
  },
  {
    id: 'm14',
    src: assetUrl('IMG_7630_05b8b248.jpg'),
    title: '7:02 qua ô kính',
    caption: 'Đồng hồ laptop điểm 7:02, còn trong ảnh là hai đứa mình đang mải mê lưu lại khoảnh khắc.',
    dateLabel: 'Đôi mình · Buổi tối',
    category: 'couple',
  },
  {
    id: 'm15',
    src: assetUrl('1795018273551_63748038427597991_6914075304245760694_07170327d942ee07a17710aee2349729_9258afc9.jpg'),
    title: 'Má hồng nắng sớm',
    caption: 'Chống tay lên má dịu dàng, góc nào của em cũng khiến anh muốn chụp lại thật nhiều.',
    dateLabel: 'Nàng thơ · Dịu dàng',
    category: 'muse',
  },
  {
    id: 'm16',
    src: assetUrl('1795018273562_63748038427597991_6914075304245760694_bb4677a6d892f62635e70c67f3419ba3_bfbcdd81.jpg'),
    title: 'Ánh mắt lườm yêu',
    caption: 'Biểu cảm tinh nghịch cực kỳ đáng yêu mỗi khi anh trêu em trong giờ học.',
    dateLabel: 'Nàng thơ · Tinh nghịch',
    category: 'muse',
  },
  {
    id: 'm17',
    src: assetUrl('1795018273512_63748038427597991_6914075304245760694_5300ea102142314efbe82c8a020d3c30_2220f006.jpg'),
    title: 'Khoảnh khắc bất chợt',
    caption: 'Giơ máy lên là có ngay một tấm hình đáng nhớ cùng nhau.',
    dateLabel: 'Đôi mình · Selfie',
    category: 'couple',
  },
];

export const VIDEO_MEMORIES: VideoMemory[] = [
  {
    id: 'v1',
    src: assetUrl('IMG_7393_f349e508.mp4'),
    title: 'Bữa bingsu xoài ngọt lịm',
    subtitle: 'Vừa ăn vừa cười nói rôm rả, lâu lâu còn quay sang thơm má anh một cái bất ngờ.',
    durationLabel: '0:31',
    orientation: 'landscape',
  },
  {
    id: 'v2',
    src: assetUrl('IMG_7595_f2db724a.mp4'),
    title: 'Cùng nhau trên ghế giảng đường',
    subtitle: 'Ngồi học cạnh nhau, em tựa đầu lên vai anh nghỉ ngơi giữa giờ ghi chép.',
    durationLabel: '0:32',
    orientation: 'landscape',
  },
  {
    id: 'v3',
    src: assetUrl('1795018273505_63748038427597991_6914075304245760694_5f6e2556.mp4'),
    title: 'Chiếc gương đỏ & tai thú bông',
    subtitle: 'Đôi ta nhí nhố trước gương, tạo đủ mọi dáng đáng yêu khiến ai nhìn cũng tan chảy.',
    durationLabel: '0:35',
    orientation: 'portrait',
  },
  {
    id: 'v4',
    src: assetUrl('IMG_6422_cfae0d57.mp4'),
    title: 'Buổi hẹn quán quen & cái nháy mắt',
    subtitle: 'Áo hồng dịu dàng, em trò chuyện líu lo rồi nháy mắt làm tim anh rung rinh.',
    durationLabel: '1:17',
    orientation: 'portrait',
  },
];

export const BIRTHDAY_WISHES = [
  {
    number: '01',
    title: 'Tuổi 21 thật rạng rỡ',
    text: 'Chúc Vũ Mạc Yến Nhi bước sang tuổi mới luôn khỏe mạnh, bình an, học tập thật tốt và lúc nào cũng giữ nụ cười tươi tắn như ánh nắng đầu ngày.',
  },
  {
    number: '02',
    title: 'Mọi ước mơ đều nở hoa',
    text: 'Chúc những dự định em ấp ủ sẽ đều thành hiện thực thật suôn sẻ. Dù có bận rộn hay mệt mỏi, hãy nhớ luôn có anh ở đây lắng nghe và cổ vũ em.',
  },
  {
    number: '03',
    title: 'Thật nhiều ngày bên nhau',
    text: 'Cảm ơn em đã đến và làm thế giới của anh trở nên ấm áp, nhiều màu sắc hơn. Mong rằng sinh nhật năm nay và rất nhiều năm sau nữa, anh vẫn được nắm tay em.',
  },
];
