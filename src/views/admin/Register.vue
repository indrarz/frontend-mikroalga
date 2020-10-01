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
                       Registrasi User
                    </h3>
    
                  </div>
                  <form role="form" v-on:submit.prevent="registeruser" method="POST">
                    <div class="card-body">
                      <div class="form-group">
                        <label for="exampleInputName">Nama</label>
                        <input type="name" class="form-control" id="exampleInputEmail1" placeholder="Masukkan Nama" v-model="register.nama" required>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Masukkan Email" v-model="register.email" required>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="register.password" required>
                      </div>
                      <div class="form-group">
                        <label>Role</label>
                        <select class="form-control" v-model="register.id_role" required>
                          <option value="2">Peneliti</option>
                          <option value="3  ">Operator</option>
                        </select>
                      </div>
                    </div>
                    <!-- /.card-body -->
    
                    <div class="card-footer">
                      <button type="submit" class="btn btn-primary">Register</button>
                    </div>
                  </form>
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
import {usersUrl, getHeader} from '../../config'
import axios from 'axios'
export default{
  data(){
    return{
      register:{
        nama: '',
        email: '',
        password: '',
        id_role:''
      }
    }
  },
  methods: {
    registeruser(){
      const postData = {
        nama: this.register.nama,
        email: this.register.email,
        password: this.register.password,
        id_role: this.register.id_role
      }
     axios.post(usersUrl, postData,{headers: getHeader()})
        .then(response =>{
          console.log(response);
          this.makeToast('success');
          this.register = null
          setTimeout(()=>{this.$router.push('/admin')}, 3000)   

        })
    },
    makeToast(variant) {
        if(variant == 'success'){
          this.$bvToast.toast('Registrasi Berhasil', {
          title: 'Notifikasi',
          variant: variant,
          solid: true
        })
        }
      }
  }
}
</script>