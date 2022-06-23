<template>
  <div>
    <!-- slider -->
    <div id="home">
      <carousel-slider :slider-ethol="sliderEthol"></carousel-slider>
    </div>
    <div class="hubungi-kami-on-laptop">
      <strong>
        <a
          href="https://wa.me/+6281331028783"
          target="_blank"
          class="btn btn-sm btn-danger"
        >
          <img src="/wa.png" alt="" />
        </a>
      </strong>
    </div>
    <div id="about" class="ethol-container">
      <v-row style="padding: 20px">
        <v-col cols="12" md="6">
          <h1 style="color: #168dbd">ETHOL</h1>
          <br />
          <p style="text-align: justify">
            Enterprise Technology Hybrid Online Learning is a platform that
            provides an excellent online learning experience for students, with
            many features and easy to use and has a good user experience.
          </p>
          <p style="text-align: justify">
            All learning is neatly arranged, so that students will feel
            comfortable to study online.
          </p>
          <v-row>
            <v-col id="ethol-project-show-mobile" cols="12">
              <img
                class="ethol-img-project"
                src="/project-ethol.png"
                alt=""
                style="width: 90%"
              />
            </v-col>
            <v-col cols="6" sm="6" xs="6" md="3">
              <v-btn class="ethol-btn-device text-none" dark>
                <v-icon left> mdi-cellphone </v-icon>
                <span>Mobile App</span>
              </v-btn>
            </v-col>
            <v-col cols="6" sm="6" xs="6" md="3">
              <v-btn class="ethol-btn-device text-none" dark>
                <v-icon left> mdi-web </v-icon>
                <span>Web Based App</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col id="ethol-project-hide-mobile" cols="6">
          <img
            class="ethol-img-project"
            src="/project-ethol.png"
            alt=""
            style="width: 90%"
          />
        </v-col>
      </v-row>
    </div>
    <div class="ethol-container-full-width">
      <v-row
        id="services"
        style="
          background-color: #f1f1f1;
          padding-bottom: 20px;
          background: url('/img/bg-dot.png');
        "
      >
        <v-col cols="12" md="6" sm="12">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
            "
          >
            <div style="">
              <center>
                <img
                  class="ethol-img-left-services ethol-img-rounded-circle"
                  src="/img/learn-ethol-filled.png"
                />
                <img
                  class="ethol-img-left-services ethol-img-rounded-circle"
                  src="/img/learn-pens-filled.png"
                />
              </center>
            </div>
          </div>
        </v-col>
        <v-col id="div-box-card-services" cols="12" md="6" sm="12">
          <v-card id="box-card-services" outlined>
            <v-card-text style="padding: 25px 20px 25px 20px">
              <h1 style="font-weight: 500">Our Services</h1>
              <br />
              <v-row v-for="(cl, index) in cardLayanan" :key="index">
                <v-col cols="12" md="12" sm="12">
                  <card-services :card-layanan="cl"></card-services>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <br />
    <div id="ethol-container-nowrap-choose-us" class="ethol-container-nowrap">
      <br />
      <v-row id="choose-us">
        <v-col cols="12">
          <h1 style="font-weight: 300; color: white">Why You Should</h1>
          <h2 style="font-weight: 500; color: white">Choose Us</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <card-choose-us title="#1 Polytechnic in Indonesia">
            <template #iconnya>
              <svg
                width="73"
                height="73"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2355 18.562L17.5073 18.7416V18.7416L18.2355 18.562ZM16.6206 19.8751L16.9596 19.2061H16.9596L16.6206 19.8751ZM17.5327 13.6117L18.0935 14.1097L17.5327 13.6117ZM17.2742 14.6645L18.0024 14.4849V14.4849L17.2742 14.6645ZM19.9463 8.11364L19.888 8.86137L19.9463 8.11364ZM20.7058 10.0378L20.145 9.53987V9.53987L20.7058 10.0378ZM14.5699 7.09485L13.8855 7.40172L14.5699 7.09485ZM15.5197 7.76848L15.578 7.02075L15.5197 7.76848ZM10.9627 3.67703L10.2784 3.37016V3.37016L10.9627 3.67703ZM13.0373 3.67703L13.7216 3.37016V3.37016L13.0373 3.67703ZM8.48026 7.76848L8.42196 7.02075L8.48026 7.76848ZM9.43013 7.09485L10.1145 7.40172L9.43013 7.09485ZM3.29416 10.0378L2.73331 10.5358L3.29416 10.0378ZM4.05367 8.11364L4.11197 8.86137L4.05367 8.11364ZM6.72576 14.6645L5.99758 14.4849L6.72576 14.6645ZM6.46729 13.6117L5.90645 14.1097L6.46729 13.6117ZM7.37943 19.8751L7.04037 19.2061L7.37943 19.8751ZM5.76452 18.562L6.4927 18.7416L5.76452 18.562ZM11.4905 17.7915L11.8295 18.4605L11.4905 17.7915ZM12.5095 17.7915L12.1705 18.4605H12.1705L12.5095 17.7915ZM11.1514 17.1225L7.04037 19.2061L7.71849 20.5441L11.8295 18.4605L11.1514 17.1225ZM6.4927 18.7416L7.45394 14.8441L5.99758 14.4849L5.03634 18.3824L6.4927 18.7416ZM7.02814 13.1138L3.855 9.53987L2.73331 10.5358L5.90645 14.1097L7.02814 13.1138ZM4.11197 8.86137L8.53857 8.51621L8.42196 7.02075L3.99536 7.36591L4.11197 8.86137ZM10.1145 7.40172L11.6471 3.98391L10.2784 3.37016L8.74579 6.78798L10.1145 7.40172ZM12.3529 3.9839L13.8855 7.40172L15.2542 6.78798L13.7216 3.37016L12.3529 3.9839ZM15.4614 8.51621L19.888 8.86137L20.0046 7.36591L15.578 7.02075L15.4614 8.51621ZM20.145 9.53987L16.9719 13.1138L18.0935 14.1097L21.2667 10.5358L20.145 9.53987ZM16.5461 14.844L17.5073 18.7416L18.9637 18.3824L18.0024 14.4849L16.5461 14.844ZM16.9596 19.2061L12.8486 17.1225L12.1705 18.4605L16.2815 20.5441L16.9596 19.2061ZM17.5073 18.7416C17.5961 19.1015 17.2347 19.3455 16.9596 19.2061L16.2815 20.5441C17.7478 21.2873 19.3471 19.937 18.9637 18.3824L17.5073 18.7416ZM16.9719 13.1138C16.5535 13.585 16.3954 14.2333 16.5461 14.8441L18.0024 14.4849C17.9692 14.3503 18.0049 14.2095 18.0935 14.1097L16.9719 13.1138ZM19.888 8.86137C20.1962 8.8854 20.3773 9.27823 20.145 9.53987L21.2667 10.5358C22.2994 9.37263 21.5819 7.4889 20.0046 7.36591L19.888 8.86137ZM13.8855 7.40172C14.1681 8.03186 14.7699 8.46229 15.4614 8.51621L15.578 7.02075C15.4414 7.0101 15.3154 6.92432 15.2542 6.78798L13.8855 7.40172ZM11.6471 3.98391C11.7869 3.67203 12.2131 3.67203 12.3529 3.9839L13.7216 3.37016C13.0519 1.87661 10.9481 1.87662 10.2784 3.37016L11.6471 3.98391ZM8.53857 8.51621C9.2301 8.46229 9.83192 8.03186 10.1145 7.40172L8.74579 6.78798C8.68465 6.92432 8.55857 7.0101 8.42196 7.02075L8.53857 8.51621ZM3.855 9.53987C3.62269 9.27823 3.80385 8.8854 4.11197 8.86137L3.99536 7.36591C2.41805 7.4889 1.7006 9.37264 2.73331 10.5358L3.855 9.53987ZM7.45394 14.8441C7.60457 14.2333 7.44653 13.585 7.02814 13.1138L5.90645 14.1097C5.99505 14.2095 6.03076 14.3503 5.99758 14.4849L7.45394 14.8441ZM7.04037 19.2061C6.76533 19.3455 6.40393 19.1015 6.4927 18.7416L5.03634 18.3824C4.65292 19.937 6.25219 21.2873 7.71849 20.5441L7.04037 19.2061ZM11.8295 18.4605C11.9371 18.406 12.0629 18.406 12.1705 18.4605L12.8486 17.1225C12.3147 16.8519 11.6853 16.8519 11.1514 17.1225L11.8295 18.4605Z"
                  fill="white"
                  fill-opacity="0.7"
                />
              </svg>
            </template>
          </card-choose-us>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <card-choose-us title="Piooneer of Distance Learning in Indonesia">
            <template #iconnya>
              <svg
                width="73"
                height="73"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75598 11.0731L6.28106 11.6535L6.75598 11.0731ZM9.70978 10.5989L9.07704 10.1963L9.70978 10.5989ZM17.244 11.0731L17.7189 11.6535L17.244 11.0731ZM14.2902 10.5989L13.6575 11.0016L14.2902 10.5989ZM19.5571 16.6576L20.2969 16.7809L19.5571 16.6576ZM4.44293 16.6576L3.70314 16.7809L4.44293 16.6576ZM2.2602 8.1233L3.70314 16.7809L5.18273 16.5343L3.7398 7.8767L2.2602 8.1233ZM8.38851 20.75H15.6115V19.25H8.38851V20.75ZM20.2969 16.7809L21.7398 8.1233L20.2602 7.8767L18.8173 16.5343L20.2969 16.7809ZM20.5251 7.41953L16.7691 10.4926L17.7189 11.6535L21.4749 8.58047L20.5251 7.41953ZM2.52507 8.58047L6.28106 11.6535L7.23091 10.4926L3.47493 7.41953L2.52507 8.58047ZM10.3425 11.0016L12.6327 7.40266L11.3673 6.59734L9.07704 10.1963L10.3425 11.0016ZM11.3673 7.40266L13.6575 11.0016L14.923 10.1963L12.6327 6.59734L11.3673 7.40266ZM6.28106 11.6535C7.5567 12.6973 9.45764 12.3921 10.3425 11.0016L9.07704 10.1963C8.67481 10.8283 7.81075 10.967 7.23091 10.4926L6.28106 11.6535ZM16.7691 10.4926C16.1892 10.967 15.3252 10.8283 14.923 10.1963L13.6575 11.0016C14.5424 12.3921 16.4433 12.6973 17.7189 11.6535L16.7691 10.4926ZM15.6115 20.75C17.9335 20.75 19.9151 19.0713 20.2969 16.7809L18.8173 16.5343C18.5561 18.1014 17.2002 19.25 15.6115 19.25V20.75ZM3.70314 16.7809C4.08487 19.0713 6.06652 20.75 8.38851 20.75V19.25C6.79978 19.25 5.44391 18.1014 5.18273 16.5343L3.70314 16.7809ZM21.75 6.5C21.75 6.91421 21.4142 7.25 21 7.25V8.75C22.2426 8.75 23.25 7.74264 23.25 6.5H21.75ZM21 7.25C20.5858 7.25 20.25 6.91421 20.25 6.5H18.75C18.75 7.74264 19.7574 8.75 21 8.75V7.25ZM20.25 6.5C20.25 6.08579 20.5858 5.75 21 5.75V4.25C19.7574 4.25 18.75 5.25736 18.75 6.5H20.25ZM21 5.75C21.4142 5.75 21.75 6.08579 21.75 6.5H23.25C23.25 5.25736 22.2426 4.25 21 4.25V5.75ZM12.75 5.5C12.75 5.91421 12.4142 6.25 12 6.25V7.75C13.2426 7.75 14.25 6.74264 14.25 5.5H12.75ZM12 6.25C11.5858 6.25 11.25 5.91421 11.25 5.5H9.75C9.75 6.74264 10.7574 7.75 12 7.75V6.25ZM11.25 5.5C11.25 5.08579 11.5858 4.75 12 4.75V3.25C10.7574 3.25 9.75 4.25736 9.75 5.5H11.25ZM12 4.75C12.4142 4.75 12.75 5.08579 12.75 5.5H14.25C14.25 4.25736 13.2426 3.25 12 3.25V4.75ZM3.75 6.5C3.75 6.91421 3.41421 7.25 3 7.25V8.75C4.24264 8.75 5.25 7.74264 5.25 6.5H3.75ZM3 7.25C2.58579 7.25 2.25 6.91421 2.25 6.5H0.75C0.75 7.74264 1.75736 8.75 3 8.75V7.25ZM2.25 6.5C2.25 6.08579 2.58579 5.75 3 5.75V4.25C1.75736 4.25 0.75 5.25736 0.75 6.5H2.25ZM3 5.75C3.41421 5.75 3.75 6.08579 3.75 6.5H5.25C5.25 5.25736 4.24264 4.25 3 4.25V5.75Z"
                  fill="white"
                  fill-opacity="0.7"
                />
              </svg>
            </template>
          </card-choose-us>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <card-choose-us title="Best Quality for Online Learning">
            <template #iconnya>
              <svg
                width="73"
                height="73"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 20L8 20.75H8L8 20ZM17.3604 20V19.25H17.3604L17.3604 20ZM19.3216 18.3922L18.5861 18.2451L19.3216 18.3922ZM20.5216 12.3922L21.257 12.5393L20.5216 12.3922ZM14 9.99998L13.376 9.58396C13.2225 9.8141 13.2082 10.11 13.3387 10.3539C13.4693 10.5977 13.7234 10.75 14 10.75V9.99998ZM16.4258 6.36135L17.0498 6.77737V6.77737L16.4258 6.36135ZM15.2467 3.31166L15.0648 4.03927L15.0648 4.03927L15.2467 3.31166ZM15.1992 3.29977L15.3811 2.57217L15.3811 2.57216L15.1992 3.29977ZM4 9.99998L4 9.24998C3.80109 9.24998 3.61032 9.329 3.46967 9.46965C3.32902 9.6103 3.25 9.80107 3.25 9.99998H4ZM4 20H3.25C3.25 20.4142 3.58578 20.75 4 20.75L4 20ZM13.1956 3.93847L12.6261 3.45038V3.45038L13.1956 3.93847ZM7.25 10V20H8.75V10H7.25ZM8 20.75L17.3604 20.75L17.3604 19.25L8 19.25L8 20.75ZM20.057 18.5393L21.257 12.5393L19.7861 12.2451L18.5861 18.2451L20.057 18.5393ZM18.5604 9.24998H14V10.75H18.5604V9.24998ZM14.624 10.416L17.0498 6.77737L15.8017 5.94532L13.376 9.58396L14.624 10.416ZM15.4286 2.58406L15.3811 2.57217L15.0173 4.02738L15.0648 4.03927L15.4286 2.58406ZM8 9.25L4 9.24998L4 10.75L8 10.75L8 9.25ZM3.25 9.99998V20H4.75V9.99998H3.25ZM4 20.75L8 20.75L8 19.25L4 19.25L4 20.75ZM15.3811 2.57216C14.3705 2.31953 13.304 2.65952 12.6261 3.45038L13.765 4.42657C14.0731 4.06709 14.5579 3.91255 15.0173 4.02738L15.3811 2.57216ZM17.0498 6.77737C18.1047 5.19505 17.2736 3.04529 15.4286 2.58406L15.0648 4.03927C15.9034 4.24892 16.2812 5.22609 15.8017 5.94532L17.0498 6.77737ZM21.257 12.5393C21.5973 10.8376 20.2958 9.24998 18.5604 9.24998V10.75C19.3492 10.75 19.9408 11.4716 19.7861 12.2451L21.257 12.5393ZM17.3604 20.75C18.6713 20.75 19.7999 19.8247 20.057 18.5393L18.5861 18.2451C18.4693 18.8294 17.9562 19.25 17.3604 19.25V20.75ZM12.6261 3.45038L7.43056 9.51191L8.56944 10.4881L13.765 4.42657L12.6261 3.45038Z"
                  fill="white"
                  fill-opacity="0.7"
                />
              </svg>
            </template>
          </card-choose-us>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ethol-text-choose-us">
          <center>
            <p style="color: #ffffffbf">
              We are the number one Polytechnic in Indonesia and we have long
              experiences in distance educations. our students spread all over
              Indonesia and even abroad like in Taiwan.
            </p>
          </center>
        </v-col>
      </v-row>
    </div>
    <div
      id="faq"
      class="ethol-container"
      style="background: url('/img/batik.jpg')"
    >
      <br />
      <v-row>
        <v-col cols="12">
          <Faq />
        </v-col>
      </v-row>
    </div>
    <div class="ethol-container">
      <br />
      <v-row id="contact">
        <v-col cols="12">
          <h2>Contact Us</h2>
        </v-col>
      </v-row>
      <v-row style="padding-bottom: 28px">
        <v-col cols="12" md="7">
          <iframe
            style="border-radius: 10px"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.691977074106!2d112.79156701476025!3d-7.275847094748338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa10ea2ae883%3A0xbe22c55d60ef09c7!2sPoliteknik%20Elektronika%20Negeri%20Surabaya!5e0!3m2!1sid!2sid!4v1624248835547!5m2!1sid!2sid"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </v-col>
        <v-col cols="12" md="5">
          <h3>Politeknik Elektronika Negeri Surabaya.</h3>
          <v-spacer></v-spacer>
          <p>
            Kampus, Jl. Raya ITS, Keputih, Kec. Sukolilo, Kota Surabaya, Jawa
            Timur 60111
          </p>
          <p><v-icon>mdi-email-outline</v-icon> info@pens.ac.id</p>
          <p><v-icon>mdi-email-outline</v-icon> humas@pens.ac.id</p>
          <p><v-icon>mdi-cellphone-android</v-icon> +62 31 594 7280</p>
          <p style="margin-top: -15px">
            <v-icon style="color: white"> mdi-cellphone-android</v-icon>
            <small>
              Available from Monday-Friday at 08:00-16:00 local time
            </small>
          </p>
          <br />
          <h3>Request for Join as USBJJ ?</h3>
          <p style="margin-top: -5px">
            <small> Follow the instruction bellow </small>
          </p>
          <v-btn
            class="text-none"
            rounded
            outlined
            color="primary"
            href="https://ethol.pens.ac.id/usbjj/"
            ><span>Instruction &raquo;</span></v-btn
          >
        </v-col>
      </v-row>
    </div>
    <br />
    <br />
    <div class="ethol-container-nowrap" style="background-color: #404040">
      <v-row id="footer-top" style="margin">
        <v-col cols="12" md="4">
          <div style="margin-top: 40px"></div>
          <center>
            <img src="/penswhite.png" alt="" style="width: 35%" />
          </center>
          <div style="margin-top: 40px"></div>
          <p style="color: white; font-weight: 300; text-align: justify">
            Enterprise Technology Hybrid Online Learning is a platform that
            provides an excellent online learning experience for students, with
            many features and easy to use and has a good user experience.
          </p>
        </v-col>
        <v-col cols="12" md="2" class="ethol-hidden-in-mobile"></v-col>
        <v-col cols="12" md="3">
          <div style="margin-top: 40px"></div>
          <h3 style="color: white">Our Links</h3>
          <div style="margin-top: 20px"></div>
          <ul class="ethol-footer-ul-link">
            <li><a href="https://www.pens.ac.id">PENS Website</a></li>
            <li><a href="https://student.pens.ac.id/">Students</a></li>
            <li><a href="https://lecturer.pens.ac.id/">Lectures</a></li>
            <li><a href="https://online.mis.pens.ac.id/">Online MIS</a></li>
            <li><a href="http://redaksi.pens.ac.id/">PENS Editorial</a></li>
            <li><a href="http://virtualtour.pens.ac.id/">Virtual Tour</a></li>
          </ul>
        </v-col>
        <v-col cols="12" md="3">
          <div style="margin-top: 40px"></div>
          <h3 style="color: white">Internal Links</h3>
          <div style="margin-top: 20px"></div>
          <ul class="ethol-footer-ul-link">
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </v-col>
      </v-row>
    </div>
    <DialogLogin :dialog="dialogLogin" @tutup="dialogLogin = false" />
    <div id="ethol-div-btn-login">
      <v-row>
        <v-col cols="3">
          <div class="hubungi-kami">
            <strong>
              <a
                href="https://wa.me/+6281331028783"
                target="_blank"
                class="btn btn-sm btn-danger"
              >
                <img src="/wa.png" alt="" />
              </a>
            </strong>
          </div>
        </v-col>
        <v-col cols="9">
          <v-btn
            class="ethol-btn-login text-none"
            dark
            block
            height="45"
            @click="dialogLogin = true"
          >
            <v-icon color="white" small left> mdi-login </v-icon>
            <div>LOGIN</div>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DialogLogin from '@/components/frontend/dialog-login.vue'
import Faq from '@/components/frontend/faq.vue'
import Carousel from '@/components/frontend/carousel.vue'
import CardServices from '@/components/frontend/card-services.vue'
import CardChooseUs from '@/components/frontend/card-choose-us.vue'
import Cookie from 'js-cookie'
export default {
  components: {
    'carousel-slider': Carousel,
    'card-services': CardServices,
    'card-choose-us': CardChooseUs,
    DialogLogin,
    Faq,
  },
  layout: 'frontend',
  data() {
    return {
      dialogLogin: false,
      sliderEthol: [
        {
          versi: '1',
          judul: 'Learn  Something New',
          sub_judul: 'Every Day, Anywhere Anytime',
          gambar: [
            '/img/study-in-pens_1.png',
            '/img/study-in-pens_2.png',
            '/img/study-in-pens_3.png',
            '/img/study-in-pens_4.png',
          ],
        },
        {
          versi: '2',
          judul: 'Bright Future',
          sub_judul: 'Enterprise Technology Hybrid Online Learning',
          gambar: ['/img/learn-ethol-filled.png', '/img/learn-pens-filled.png'],
        },
      ],
      cardLayanan: [
        {
          judul: 'Learning Management System',
          sub_judul:
            'Our modern, easy to use, mobile friendly learning management system will be your loyal friend while you study.',
          icon: 'mdi-book',
        },
        {
          judul: 'Online learning Video for Students',
          sub_judul:
            'Our millions video are available for you to be accessed anytime and anywhere. You can choose your own pace.',
          icon: 'mdi-video',
        },
        {
          judul: 'Conference Synchronous Learning',
          sub_judul:
            'Students and Teachers will be able to communicate and discuss various topics through our video conference facilities.',
          icon: 'mdi-web',
        },
        {
          judul: 'Monitoring of Learning Effectiveness',
          sub_judul:
            'Teachers and Admins can see monitoring of student activities while studying online.',
          icon: 'mdi-brightness-7',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Enterprise Technology Hybrid Online Learning PENS ',
      meta: [
        {
          hid: 'Enterprise Technology Hybrid Online Learning',
          name: 'Enterprise Technology Hybrid Online Learning',
          content: 'Enterprise Technology Hybrid Online Learning',
        },
        {
          property: 'og:title',
          content: 'Enterprise Technology Hybrid Online Learning',
        },
        {
          property: 'og:description',
          content:
            'Enterprise Technology Hybrid Online Learning - Politeknik Elektronika Negeri Surabaya - ETHOL PENS',
        },
      ],
    }
  },
  created() {
    if (process.browser) {
      const token = localStorage.getItem('token') || Cookie.get('token')
      if (token) {
        Cookie.set('token', token)
        this.$axios.setHeader('token', token)
        this.$axios.get('/auth/validasi-token').then((res) => {
          if (Object.prototype.hasOwnProperty.call(res.data, 'nomor')) {
            this.$store.dispatch('isiUser', res.data)
            this.$axios.get('/auth/config').then((resConfig) => {
              if (resConfig.data.success == true) {
                this.$store.dispatch('isiConfig', resConfig.data)
              }
            })
            if (res.data.hakAkses.length) {
              Cookie.set('hakAktif', res.data.hakAkses[0])
              this.$store.dispatch('isiHakAktif', res.data.hakAkses[0])
              this.$router.push(`/${res.data.hakAkses[0]}/beranda`)
            }
          }
        })
        localStorage.removeItem('token')
      }
    }
  },
}
</script>
<style scoped>
.ethol-btn-device {
  background: linear-gradient(
    109.6deg,
    #168dbd 9.95%,
    #168dbd 93.04%
  ) !important;
  box-shadow: 0px 0px 5px 1px #168dbd;
  border-radius: 10px;
  padding: 5px;
}
.ethol-btn-login {
  background: linear-gradient(109.6deg, #168dbd 9.95%, #168dbd 93.04%);
  border-radius: 15px !important;
  color: white;
  box-shadow: 0px 0px 3px 1px #168dbd;
}
#box-card-services {
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
  -webkit-box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
  -moz-box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
}
#ethol-div-btn-login {
  display: none;
}
.ethol-container {
  padding-right: 80px;
  padding-left: 80px;
}
.ethol-container-full-width {
  padding-right: 0px;
  padding-left: 0px;
  padding-bottom: 0px;
}
.ethol-container-nowrap {
  padding-right: 80px;
  padding-left: 80px;
  padding-bottom: 80px;
}
#ethol-container-nowrap-choose-us {
  min-height: 100%;
  background: url('/bg-pens.png');
  background-size: cover;
  background-attachment: fixed;
}
.ethol-img-left-services {
  width: 90%;
  height: auto;
  animation: animasibayangan 5s infinite;
}
@keyframes animasibayangan {
  50% {
    box-shadow: -2px 8px 29px 4px rgba(46, 46, 46, 0.15);
    -webkit-box-shadow: -2px 8px 29px 4px rgba(46, 46, 46, 0.15);
    -moz-box-shadow: -2px 8px 29px 4px rgba(46, 46, 46, 0.15);
  }
}
.ethol-img-rounded-circle {
  width: 180px;
  border-radius: 100px;
  box-shadow: 0px 2px 10px 1.5px rgba(87, 87, 87, 0.15);
  -webkit-box-shadow: 0px 2px 10px 1.5px rgba(88, 88, 88, 0.15);
  -moz-box-shadow: 0px 2px 10px 1.5px rgba(87, 87, 87, 0.15);
}

.ethol-footer-ul-link > li > a {
  color: white;
  text-decoration: none;
  margin-left: -px;
}
.ethol-footer-ul-link {
  list-style: none;
}
.ethol-footer-ul-link li::before {
  content: '\2022'; /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: white; /* Change the color */
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 1em; /* Also needed for space (tweak if needed) */
  margin-left: -1.3em; /* Also needed for space (tweak if needed) */
  margin-top: 5px;
}
.ethol-img-project {
  float: right;
}
.ethol-text-choose-us {
  padding: 60px 70px 0px 70px;
  font-size: 14pt;
}
#ethol-project-show-mobile {
  display: none;
}
.hubungi-kami {
  z-index: 99999;
  position: fixed;
  left: 20px;
  bottom: 6px;
  color: #ffffff;
  height: auto;
  padding: 10px;
}
.hubungi-kami-on-laptop {
  z-index: 99999;
  position: fixed;
  left: 20px;
  bottom: 6px;
  color: #ffffff;
  height: auto;
  padding: 10px;
}
@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
  .ethol-img-left-services {
    width: 100%;
    height: auto;
  }
  #div-box-card-services {
    padding: 0px 20px 0px 27px;
  }
}

@media all and (min-width: 480px) and (max-width: 768px) {
  #div-box-card-services {
    padding: 0px 20px 0px 27px;
  }
  .ethol-container {
    padding-right: 40px;
    padding-left: 40px;
  }
  .ethol-img-left-services {
    display: none;
  }
  #ethol-project-show-mobile {
    display: block;
  }
  #ethol-project-hide-mobile {
    display: none;
  }
  #ethol-div-btn-login {
    position: fixed;
    z-index: 99999;
    bottom: 12px;
    display: flex;
    padding: 1rem 1rem;
    align-items: center;
    width: 100%;
  }
  .hubungi-kami-on-laptop {
    display: none;
  }
}

@media all and (max-width: 480px) {
  #div-box-card-services {
    padding: 0px 20px 0px 27px;
  }
  .ethol-container {
    padding-right: 20px;
    padding-left: 20px;
  }
  .ethol-img-left-services {
    display: none;
  }
  #ethol-project-hide-mobile {
    display: none;
  }
  #ethol-project-show-mobile {
    display: block;
  }
  .ethol-text-choose-us {
    padding: 40px 15px 0px 15px;
    font-size: 14pt;
  }
  .ethol-container-nowrap {
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 30px;
  }
  .ethol-hidden-in-mobile {
    display: none;
  }
  #ethol-div-btn-login {
    position: fixed;
    z-index: 99999;
    bottom: 12px;
    display: flex;
    padding: 1rem 1rem;
    align-items: center;
    width: 100%;
  }
  .hubungi-kami-on-laptop {
    display: none;
  }
}
</style>
