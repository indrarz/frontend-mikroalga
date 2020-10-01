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
                      <i class="fas fa-th-list"></i>
                       Daftar Izin Akses
                    </h3>
    
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Nama Aksi</th>
                        <th>Produksi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="list in list.data" :key="list.id">
                        <td>{{list.user.nama}}</td>
                        <td>{{list.user.email}}</td>
                        <td v-if="list.id_aksi === 1100">Unduh Log Sensor</td>
                        <td v-else-if="list.id_aksi === 1200">Melakukan aksi pada kolam</td>
                        <td>Produksi {{list.id_produksi}}</td>
                        <td v-if="list.is_approved === null">Pending</td>
                        <td v-else-if="list.is_approved === true">Diizinkan</td>
                        <td v-else-if="list.is_approved === false">Ditolak</td>
                        <td v-if="list.is_approved === null">
                          <button type="button" class="btn btn-block bg-gradient-success btn-sm" @click="acceptLog(list.id)">Izinkan</button>
                           <button type="button" class="btn btn-block bg-gradient-danger btn-sm" @click="rejectLog(list.id)">Tolak</button>
                        </td>
                        <td v-else></td>
                      </tr>
                      </tbody>
                    </table>
                    <div class="text-center mt-5">
                                     <b-button v-if="hidefirst==false" variant="light" @click="first()"><i class="fas fa-angle-double-left"></i></b-button>
                                     <b-button v-if="hidefirst==false" class="mr-3" variant="light" @click="prev()"><i class="fas fa-angle-left"></i></b-button>
                                     <span>{{current_page}}</span>
                                     <b-button v-if="hidelast==false" class="ml-3" variant="light" @click="next()"><i class="fas fa-angle-right"></i></b-button>
                                     <b-button v-if="hidelast==false" variant="light" @click="last()"><i class="fas fa-angle-double-right"></i></b-button>
                                   </div>
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
import {perizinanUrl,  getHeader} from '../../config'
import axios from 'axios'
export default {
  data: function(){
    return{
      list: [],
      current_page: '',
      last_page: '',
      hidefirst: true,
      hidelast: true
    }
  },

  methods: {
     next: function(){
        var app = this
        var nextUrl = app.data.next_page_url
        app.data = []
        axios.get(nextUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == app.data.last_page){
              app.hidelast = true
            }
            else{
              app.hidefirst = false
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      last: function(){
        var app = this
        var lastUrl = app.data.last_page_url
        app.data = []
        axios.get(lastUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidelast = true
            app.hidefirst = false
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      prev: function(){
        var app = this
        var prevUrl = app.data.prev_page_url
        app.data = []
        axios.get(prevUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == 1){
              app.hidefirst = true
            }
            else{
              app.hidelast = false
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      first: function(){
        var app = this
        var firstUrl = app.data.first_page_url
        app.data = []
        axios.get(firstUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidefirst = true
            app.hidelast = false
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
    getLogaksi: function(){
      var app = this;
      
        axios.get(perizinanUrl, {headers: getHeader()})
        .then(function(response){
          app.list=response.data.data;
          app.current_page = response.data.data.current_page
          app.last_page = response.data.data.last_page
          if(app.current_page != app.last_page){ 
            app.hidelast = false
            }
          //console.log(app.list.data.length)
          /*for (let index = 0; index < app.list.data.length; index++) {
            var namaUrl = usersUrl + '/' + app.list.data[index].id_user
            //console.log(app.list.data[index].id_user)
            axios.get(namaUrl, {headers: getHeader()})
            .then(function(response){
              app.nama.push(response.data.data.nama);
              app.email.push(response.data.data.email);
              
              
            })
           console.log(app.nama[index])
          }*/
          //console.log(app.user)
        })
    },
    acceptLog: function(key){
      //var app = this;
      var accUrl = perizinanUrl + '/' + key + '/approve'
      axios.put(accUrl, '', {headers: getHeader()})
      this.acceptsukses();
    },
    rejectLog: function(key){
      //var app = this;
      var rejectUrl = perizinanUrl + '/' + key + '/approve'
      axios.put(rejectUrl, '', {headers: getHeader()})
      this.rejectsukses();
    },
    acceptsukses: function() {
          this.$bvToast.toast('Permintaan aksi berhasil disetujui', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      },
      rejectsukses: function(){
        this.$bvToast.toast('Permintaan aksi berhasil ditolak', {
          title: 'Notifikasi',
          variant: 'danger',
          solid: true
      })
      }
  },
  created(){
    this.getLogaksi();
  }
}
</script>