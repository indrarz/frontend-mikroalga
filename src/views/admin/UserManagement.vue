<template>
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
                       User Management
                    </h3>
    
                  </div>
                  <div class="card-body">
                <button type="button" class="btn btn-primary" @click="register()" >Registrasi Akun</button>
                    <br/>
                    <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama</th>
                                      <th>Email</th>
                                      <th>Role</th>
                                      <th>Status</th>
                                      <th>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="data in data.data" :key="data.id">
                                      <td>{{data.nama}}</td>
                                      <td>{{data.email}}</td>
                                      <td v-if="data.id_role === 1">Admin</td>
                                      <td v-else-if="data.id_role === 2">Peneliti</td>
                                      <td v-else-if="data.id_role === 3">Operator</td>
                                      <td v-if="data.deleted_at === null">Aktif</td>
                                      <td v-else>Nonaktif</td>
                                      <td v-if="data.deleted_at === null"><button type="button" class="btn btn-block btn-danger btn-sm" @click="deleteUser(data.id)">Nonaktifkan Akun</button></td>
                                      <td v-else><button type="button" class="btn btn-block btn-success btn-sm" @click="restoreUser(data.id)">Aktifkan Akun</button></td>
                                      </tr>
                                    </tbody>
                                  </table>
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
import {getHeader, usersUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          data: []
        }
    },

    methods: {

      getUsers: function() {

        var app = this;

         axios.get(usersUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            console.log(app.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });

      },
      deleteUser: function(key){
        //window.console.log('id delete' + key)
        const delUrl = usersUrl + '/' + key;
        axios.delete(delUrl, {headers: getHeader()});
        this.makeToast('danger');
        this.getUsers();
      },
      restoreUser: function(key){
        //window.console.log('id delete' + key)
        const resUrl = usersUrl + '/' + key + '/restore';
        axios.put(resUrl, key, {headers: getHeader()});
        this.makeToast('success');
        this.getUsers();
      },
      register: function(){
        this.$router.push('/admin/register')
      },
      makeToast: function(variant) {
        if(variant == 'success'){
          this.$bvToast.toast('Akun berhasil diaktifkan kembali', {
          title: 'Notifikasi',
          variant: variant,
          solid: true
        })
        } else{
          this.$bvToast.toast('Akun berhasil dinonaktifkan', {
          title: 'Notifikasi',
          variant: variant,
          solid: true
        })
        }
      }

    },

    created() {
      this.getUsers();
    }

    }
</script>