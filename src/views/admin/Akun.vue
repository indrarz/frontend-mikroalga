<template>
     <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">

      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
            <div class="col-12">
                <!-- interactive chart -->
                <div class="card card-primary card-outline">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="far fa-clipboard"></i>
                       Ubah Email
                    </h3>
    
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" placeholder="Masukkan email baru" v-model="email">
                  </div>
                  <button type="button" class="btn btn-primary" @click="changeEmail()">Ubah Email</button>
                  </div>
                  <!-- /.card-body-->
                </div>
                <!-- /.card -->
                <div class="card card-primary card-outline">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="far fa-clipboard"></i>
                       Ubah Password
                    </h3>
    
                  </div>
                  <div class="card-body">
                      <div class="form-group">
                    <label for="exampleInputPassword1">Password Baru</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Masukkan password baru" v-model="password">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Ulangi Password Baru</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Masukkan kembali password baru" v-model="repassword">
                  </div>
                  <button type="button" class="btn btn-primary" @click="changePassword()">Ubah Password</button>
                  </div>
                  <!-- /.card-body-->
                </div>
                <!-- /.card -->
    
              </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {userUrl, usersUrl, getHeader} from "../../config"
import axios from "axios"
export default {
    data: function(){
        return{
            myid: '',
            email: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
    getMe: function(){
      var app = this;

         axios.get(userUrl, {headers: getHeader()})
            .then(function (response) {
            app.email = response.data.email;
            app.myid = response.data.id;
            //console.log(app.email);
        })
        .catch(function (error) {
            console.log(error.message);
        });
    },
    changeEmail: function(){
        var app = this;
        const emailData = {
            email: app.email
        }
        
        var emailUrl = usersUrl + '/' + app.myid + '/email';
        axios.put(emailUrl,emailData, {headers: getHeader()})
        this.emailsukses()
        //this.$router.push('/admin')
    },
    changePassword: function(){
        var app = this;
        if(app.password == app.repassword && app.password !=null && app.repassword !=null){
            const passwordData = {
                password: app.password
            }
            var passwordUrl = usersUrl + '/' + app.myid + '/password'
            axios.put(passwordUrl, passwordData, {headers: getHeader()})
            this.passwordsukses()
            //this.$router.push('/admin')
        }
    },
    emailsukses: function() {
        this.$bvToast.toast('Email Berhasil Diubah', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
    passwordsukses: function() {
        this.$bvToast.toast('Password Berhasil Diubah', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
    },
    created(){
        this.getMe();
    }
}
</script>