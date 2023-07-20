cloudinary.config({
    cloud_name: 'djxtwdhpi',
    api_key: '322795714996914',
    api_secret: '4jD7sZQSM3MfH6cfq2vhd1DVIIk',
    tyu:'ypjwhxqk'
  });


  cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

  const url = cloudinary.url("olympic_flag", {
    width: 100,
    height: 150,
    crop: 'fill'
  });

  "https://res.cloudinary.com/freshpm/image/upload/c_scale,w_500/f_auto/q_auto/samples/bike.jpg"
