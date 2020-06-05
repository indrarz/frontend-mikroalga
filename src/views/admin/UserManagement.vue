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
                    <router-link to="/admin/register">register</router-link>
                    <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama</th>
                                      <th>Email</th>
                                      <th>Role</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="data in data.data" :key="data.id">
                                      <td>{{data.nama}}</td>
                                      <td>{{data.email}}</td>
                                      <td>{{data.id_role}}</td>
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
            app.data = response.data;
            //console.log(app.users)
        })
        .catch(function (error) {
            console.log(error.message);
        });

      }

    },

    created() {
      this.getUsers();
    }

    }
</script>