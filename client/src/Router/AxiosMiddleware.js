import axios from "axios";

const AxiosGet = (req, res, next) => {
    try {
      axios
        .get("http://localhost:5000" + req.url, req.type)
        .then((res) => req.data(res.data.result))
        .catch((err) => {
        //   if (
        //     err.response.data.code === 401 ||
        //     err.response.data.code === 419
        //   ) {
        //     if (err.response.data.code === 401) {
        //       alert("유효하지 않은 접근 입니다. 로그인을 먼저 해주세요.");
        //     }
        //     if (err.response.data.code === 419) {
        //       alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        //     }
        //   } else if (err.response.data.code === 500) {
        //     alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        //   } else {
        //     console.log(err.response.data.code);
        //   }
        });
    } catch (err) {
      console.log(err);
    }
};

const AxiosPost = (req, res, next) => {
  try {
    axios
      .post("http://localhost:5000" + req.url, req.type)
      .then((res) => res.send(res))
      .catch((err) => res.send(err));
  } catch (err) {
    console.log(err);
  }
};

export {AxiosGet, AxiosPost};

