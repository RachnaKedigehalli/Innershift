const modules = [
  {
    title: "Breathing Module",
    description:
      " At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti",
    thumbnail:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBYSFhUYGBgZGRgZGBgYGBwcGhYZGBkaGhwZGhgeIS4lHB8rIRgYJjgmKy8xNTU1GiQ7QDszPy40NjEBDAwMEA8QHxISHzErJSs9PzU6Nj00MT0xPTY2NDQ2NDQ2NDQ0NDE0PTE0NjQ0NjQxNDQ0NDU0NDQ2NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgEGB//EAD4QAAIBAgQCCAQEBAYBBQAAAAECAAMRBBIhMUFRBSIyYXGBkaEGE7HwQnLB0RRSYtIjgrLh4vGSFjNDU6L/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACYRAQEAAgICAgICAgMAAAAAAAABAhEhMRJBA2EiUXGhE5EEMoH/2gAMAwEAAhEDEQA/AP0aIibeQiIgIiICIiAiIgIiICIiAiVP49TUWmNb314aDQCW5jD5Mc93G71wWWdkRE2EREBERAREQEREBERAREQEREBERAREQEREBERASvisfSp/+5VRPzuq+xMsEX0O0/IPiPoMYau1NeyQHQ81a+/eCGF+Nr8ZnLKxcZK/Sv8A1Jg72/iaX/mLf+W0uYqqDSLowYECzKQQQSBcEaGfiL0yP9prfDHTLYeqFLH5LkLUS+gDaZwODLvfiBblbhnlcsbj+5Y3465fbVCS4tvdQPHS3vNHpf4iSiTTUZ3G4Bsqnkzc+4edpn9Ov/DLcNeo+bKbWyKNGYf1agDxJ4T4eriCdtB7meP/AI+Ofw43G93+i6t2+qPxpUU3ZKZH8qh7+uY/Sfa4dmKKXTIxALJmzZTxGYbz4H4R6Aao64h1tTUhkB/+RhtYfyA6342trrb9Bnv+Hy1vKsZaIiJ2QiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJh/FfQn8TSGS3zEuUvpmB7SE8L2FjzA4Xm5Elm+CXT8TqU2VirAqymzKRYqRwIOxkFahmFgNToAPxE8AOc/Z8d0XRrWNSkjkaBiOsByzDW3nPej+iqFFgadJENwMwW7WJ2zG5t5zn/AI25kzel/hw4sU2NQoyIA4KZs3H+YWIObnPOj/hLDUiGKmow4vYqPBAAPW8+lUdap4f3SCa8Md70l4hERNskREBERAREQEREBERAREQEREBERAREQEREBERAREQE6TtL+ZfqJzOk7S/mX6iFncTL2qnh/dK8sDtVPD+6V4XL0REQyREQEREBERAREQEREBERAREQEREBERAREQEREBEkSmW8OJ4ToOg26558LybWY+0M6TtL+ZfqJLTrXORgMp0Fhax35/du+RhbMByYfUSrJqyxKvaqeH90rywvaqeH90jopc67DUyLlN6iOJMcSTuqkcBsQPE3v7QoR9FOVv5T9/S8bTx31UMTpkINiJzKyREQEREBERAREQEREBERAREQEREBERASVEFszbfWeUkvqdhv+0ixGJGZFP4iQo5WBP6e8lyk7ak1zUr1CdNhwAlbE4Z81gwUEAtbVr2tbu0A9BLdAbsdh9fv6iY7066OWDZ1vfrNY25G+nmPacfmtkk1bPrtfu9vMd0pSwwtUqkt2gLFmFtjYDQXHHfhNl2DFKi7PkI79QR7ET8/xfw7ia+JcOpRC7FnJU3W9hkAJJ6oAHAW1tP0DDIMiqBojgDuFwQPRh6S/Hcrvc1PS4z06HaqeH90o9IdJ08PTVqjEfMfKtgSeqCToOGn/wCpdB61T8p9s0xfi7oc4iklNCA6WZL6BjaxUnhcWN+YE3lbrjsvW06/4gFSnVOU7WsV8LHj4i8tUaByljYm/Wtz017vw+Gk+X+GcHi6aVQ1MrcpbMy2zWa7Cx5ZfafRdGI6EtUa+bQrckAHiSfTwvOGFvlxLz3zwkk6q6tbTK+q8G4r4/v6855VplT9DI8WQgYm9lBPeRa8kw7ggIeybZT/ACk7Dw5enET0bm9HfF7RxOnQg2M5mmCIiAiIgIiICIiAiIgIiICIiAnoE8k1Cwu52Ue/39YWTdc4lyq5FFyN9bXJ75TamWZC4UBWvdSbjgdMuszsN8S0XrCkM/WJCvbRjuTYHMBa5uRtqbTfyJ/P6C/uJy1Mud8Nc2vaq5VA5knx5exHpIkTMcvP9pMiqVyBwSD1eduRHDe3kJG+HbYrf3nSGU53rhJXQ5VY7gAN9+N/aeYY2zE7aeuvvtPKFNlPJeIO3kOB+vpJ0toNgeyP1hqTd2gQFWDMDY6H/Nz87es8xHaN+76T2i5LWJuDe4Oo24cuVu+Sow0uQb9hjxvwP9X1tzuAJNzUeLQOQDQXNzf2EqkX0kj0GJuVuee89Wg3h3mGbLbxHmMpZ6XWOpUDlc6Hextx4Sr19AVW2xAY3A8xwl58hAGfQC2gze4lXG16dNGqM1wgzEBbm3Ow1t37DjYTGWM73oyl2sA5117Sb945/fENIZm9CdP06zWUMpG6tbrKSBmBBI0Nr8gTNarTysR6eE1jlLNxLzNo4iJpkiIgIiICIiAiIgIiICIiAnHSTotMU32cHMLkEhhYi4II0JF7iSotyBzPtx9ryHH4RKjszLc7XudLctbc5y+TyuP4a399NY6k3VHozonDUialJApItmLOxA46uxy98t4fG0nYqlRHZdSEdWIHMgGV8DiKCu+EXMzAZnKhm+XcW6zdkHkBvy0vLfR/ROHpAmkmQZVUkAgkLe1yRcnU+MYeXjN6+9LrfSKua3zKapSV6bGztmAanyaxPWXuFzNAME4lj+Y5R7/fdPTVAViBoNNiSb2ubDxEzSXc6AonEntt4D8I9/CLl4/u39L100Eu51Og1PICEe7qe8+mVrSv0hhi9E01coz5TnG6ZWVhbUa6D3lfojD1UFqtX5rZ7hsmSwYjq2ub6k+tuE3vnpN6saNEWdu4N/qE4w9tUbste3c259d/EHnJF7VTwPvf9ph1ujqzVvmfxJFMMjCmqW1Q3ALZtdde/S+wi2rvWmyKjLdTqBoQTqPBt/X2kWMZijvSUu6jq02cAk/mc2HrbTQzvGIWRXU5W7trjSxHEaEeQlWjXYEZ0IYHdQSpHGxHZ0voZm5SXV4+/R9XpJh8+Rc6hXsM6rchTyBO8ioY6lUJRKiORcFVdW23uAdtfeadQgtkbQ/hYce7uP2OUzk6Kw9JzVWmQ9nvkUguHbMwOgDagW9prd40lx0zE6LweHcVFTI+uzvazAg9TNltYnS3hN4tmRXvfgTz7/a/+aY9AYbElqyXbXKykspVl0symxU92k1cFSVVdFFhbMBcnXja+2y+s5fHM/K261612TXTmIid2CIiAiIgIiICIiAiIgIiIE2H7V+QJ+/K8hkiXCORvYAeP2wmdgekQ5ykZW5fpOWXy44WTK99NWXxiriOksJgzkd1RnYuwAZ3YudXcKCeep5WG023qhgMpBW11I2IPG/Gfn1f4TrYjGYio7ZENTRyLs6WXKEXuWwzHQEcbET7qhRVEWmosqKqqOQUWA9BN47LxNQOMRSKJYB3OZVP4gAAbHY7HTfSTUkzMBw3PgPu3nMP4h6GOICOjhKiE5Sb2INiQSNQQVBBF7a85uYJHWjdyC+UBiuxOxIvzJMkt3ZYuPN/hJXbMqt437j9g+kqpiEzqmYFsy6DW2o35Sn0V0i71sUgsadN0Rbi/X+WDUHkSuneZZw+FRGDKNS6m977uJnK58eOtey2W7Xnaxqk7BQfZpUpVlcXVgR3cPEcJbca1PBfoZSw2HWmzOgF2Fje5G+ktuW5rWvf7MtL1K2VUP4g597j2N/8sqYhgqsWIUAG5JsB4k7Sj0V0i9R8QH0eliGUAcKfVZD5oT6mc/FXRNauURHRKZN3ve9xsQALNbexI1PdLbZNzlbzP4aRxKVVWohzIyixsRca8DK/SXTFGggOIfLc2RsrMW5ghQTpxPhxkmGw600SmvZRQq87KLa98yviXoEYpFGbI6ElGIuOtbMrDkcq6ja3HaXnX2zMueV7AfJe+IpFW+YBmdDo+S4F/wCoXI58DtL+HazqfEeov9QJ8p8FdHVcMmISqMoFQFdbqeoMzqeIIyj/AC23FptYbpDPUyqvVWzE9wImL8uONmN7vpZNXa+62JHImcybEjrny+khnVizVIiICIiAiIgIiICIiAiIge16wSi9Rr2BLGwJNgoJsB4THoYd3rfONMU00I6/+I/eyC6Lflmvz10G4Tamv5m/1MJXrswViouwGgJtecs8cbPy5k5at1YtBFbssPynQjy39pkL0Q9JhUbHVMt+stUoyNfTLbKmXuy21tvtJsLWdyVdMpAU9xzX1HpMbB4V8TiBiagK0UN6CHTORtUK8B+IE6nTgBdM5ZLjvldz9PqlKg2UZjzOw8pI75s68gPqSf8ATIlGUZuJ7Pd3zikesO+6nwP66D3nRZdcftkYjpvDUiUzqDclgik9Ym7ElRbNe99by7gcYlUK6MGGdRxBBzDQg6g+Mx8R8CYa+ZWqheQdSAOVypPneavR+CpUAlOmoQFlNt2YhhcknVvEznjct860zrV0033qeCfrMbHdNUKLZHfrcVALEeNtB4bzYY61CeCr7BpgdKfDuHxB+YylXP40IBbx0Ibxtfvmst6/Htcu1zAYujWJamysTlDECz2uQMwIDWF2tfTU2mv8wkuoAJB2PFSPre48hzmJ0F8MUsM5qqXL5WAzsNjv1VAHAbiaCuQwcake4O4/XxAjHdn5drL4/wDrjGqroVWqaBawzWW4vwQt1cx8/C+0XR3QzUsx/iKtXN/9rhwO9bIMv0knSuBStTZG1SoLXH4TuCORBAI7xMf4eFVC+GrjMyDNTqbiol7b81NtDqMw4Wut5iWycWNrF0FZGTNqRpl2BGu+vhMnAO9P/BqUgrOWCPTJdHspPWJsykAHcW5HcC2mJqM4AQZMzAsbjRSRmEuX/aYx8c8vOTmccxLfSfFG5B5qD7mQSWp2UP8ASPoP3kU6wy/7UiIlZIiICIiAiIgIiICIiBT6e6NGJwwpZsrZiyNwDAta44ixI85R+E1xAV6NVGBplcrHssrX0V9mAy6cgbaWn0DdhfFvqZRxz1FQmkmd9hd8ii/4ma4OUchqfcc7jN7bt51V+ih1VgbNxtsfu3p3zpKQDAE3PAe+szqmKNGjnrVD1QudwGAuSFuFXULc+m8no1V6lRSCujBgbgqwtmBG4sbzayzh5isUqm7HXlx07p3hKyMoqA33sLeV5WxvRgaoWdiQdQo0FuV9+ckNVFZaeYBiOqlxmyjS4XfKNNdtpywvyXK3LUnr9pbJft09RlVypscrG3C9jrbhrynGBRSVqAavlJJNzob2vwA5SU+vdzjo6lkVQfwLqe+1v3mssfyl9a/tJd8LCnrVB3fTMP1mavUqIqXXMWYgbCwOwOguTL1B7OCeNwfPX6gDzkFWhaoG5Ky+pUg+gPrJnLda73P9LvjaZKhDB9TwPgeXmAfWQYjFIjBcx1FxpsLkfpO3cAEnYbyvWpJWQG4ZTqjowPmrC4Ij5PLX4a39pMvVXsI9yQNVYE23101Hj9Z2lEHVWuvv4fesrdHYc01Yliw2W411tcd+w95BicZTpsiu4V3YIguczkkCwy621GuwvNY3K4y5TVa3JrfK86MzXyn7758biejK+KxTGorJRpvlAa4LhDsgPBrXL8joTYT6HHVMQrI1Prps6FsrW4OjEgXGt1bQ6bby3JcZlxfTNs7iWoeqn5f0WRSV+wn5f0EinQy7IiIZIiICIiAiIgIiICIiBIzAUwSQAGa5PDrN+0orj0Jtc+NtJoUCCCh0ubr+o+p8+6Z1fotcxOqE6kC1j32/aef5v82pfi1/Fb47qXGYVa1N6Taq6FTbezC1x38R4Sl8KdGVMPh/lYgglHcJY3zITcG3C5LGx2vNLDXRQisbd9r6zM6Gp4gPiGruSGfqAtcBQN15KbgW/pOms6S3jc5TckaWK6RRSqVNBUfIhW4IbKWtcajs2uONhaZ/S9RMLQetRTM5K5tCWN9M9RiczAd/dtIOm8A9arhbdlHao54ALkI8ydB58puIhbYecatti739vm/hTpHE4gO9QDJsrZQpLclAFioG58N9bfTv1VycTq37QWC7G7c+A8JCZrHHU1vaXgI++XfJm665/wAQ0YeHH74ESGeq5U5hv7Ecj+/D1B0mN9V8aPiHFJiTSqU83WtkRPwk6NTa1yLa3Pnbh9TiFw+HV67GwUF3yZgHPMqpysx0AvqdJfChtVNjxU6W+/SY/wAR9HtWw9Sko65AKg6XKkMB52t5icvGyXnbXXprriAdwMhHD8Pf4d/D1t8/U6AqP0gcW9jSpogo2NyWKkEkDYKWc95YHhNTAg/LphrhsiXB3Byi9++8o9EJiUrYnO5NMvenqCADrZVPZABAO1yCec1fRMt9tGrWVBdjb6nwEjoYxHOUGx4A2F/CMZhvmMGZiDa2ltgSePjJMHgFW+Ub9pzv6/oJx381+T1Mf7prHXHaxU7KflH0EiklZwTpsBYeEjnojOV3SIiVCIiAiIgIiICIiAiIgCJIK7DQ2YcmH6/uDI4vBLZ0l+YvFPQ/9T3On8h9f+UgzCeZhJpfK/X+lj5oGyDzN/a36zhqrHc+Q0EizjnHzBzlLa6icfNXnHzV5wjuJx81ecfNHOB2R/sdiPA8JKtdhobMOTD9Rp7SD5g5xnHOFls6WPmLxT0b/qM6fyH1/wCUr5hPcwk0eX8f6T/NHBB5m/tb9Zw9Qnc+XCcXiUtpERCEREBERAREQEREBERA8M8M6iBGbyJryzFoFJs0hcNNLKIyCDbIfPInzzbyDlHyxyhdvnmFScEVp9J8ocp58peUG3zgFadKKs+h+UvKe/KXlBthoHkqZ5r/ACxyjIOUG2auaTLml3IIyiE2rJmkovJbRA5E9E9iAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB//Z",
    tasks: [
      {
        type: 1,
        title: "Self care routine",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: 0,
        title: "How was your day?",
        description:
          "Describe your day briefly focusing on how you felt throughout the day.",
        content: "",
      },
      {
        type: 2,
        title: "Changing Perspective",
        description:
          "Watch this video and try to meditate by following the instructions.",
        content: "https://www.youtube.com/embed/lS0kcSNlULw",
      },
    ],
  },
  {
    title: "Exercise Module",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti ",
    // imageUri:"https://i.pinimg.com/originals/61/f1/bf/61f1bf6bb91dd1dc445cdf6815b916fc.png"
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcZTHhdw_hsBX2w2UCA5H7qUelamNPRuJXQ&usqp=CAU",
    tasks: [
      {
        type: 1,
        title: "Self care routine",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: 0,
        title: "How was your day?",
        description:
          "Describe your day briefly focusing on how you felt throughout the day.",
        content: "",
      },
      {
        type: 2,
        title: "Changing Perspective",
        description:
          "Watch this video and try to meditate by following the instructions.",
        content: "https://www.youtube.com/embed/lS0kcSNlULw",
      },
    ],
  },

  {
    title: "Questions Module",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6BN2yeE70tVjmVEwbDS4vHIrzaO2kafqSA&usqp=CAU",
    tasks: [
      {
        type: 1,
        title: "Self care routine",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: 0,
        title: "How was your day?",
        description:
          "Describe your day briefly focusing on how you felt throughout the day.",
        content: "",
      },
      {
        type: 2,
        title: "Changing Perspective",
        description:
          "Watch this video and try to meditate by following the instructions.",
        content: "https://www.youtube.com/embed/lS0kcSNlULw",
      },
    ],
  },
  {
    title: "Stretching Module",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque  ",
    thumbnail:
      "data:image/jpeg;base64,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",
    tasks: [
      {
        type: 1,
        title: "Self care routine",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: 0,
        title: "How was your day?",
        description:
          "Describe your day briefly focusing on how you felt throughout the day.",
        content: "",
      },
      {
        type: 2,
        title: "Changing Perspective",
        description:
          "Watch this video and try to meditate by following the instructions.",
        content: "https://www.youtube.com/embed/lS0kcSNlULw",
      },
    ],
  },
];

export default modules;
