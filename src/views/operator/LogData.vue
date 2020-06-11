<template>
      <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Log Data</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Log Data</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
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
                      <i class="far fa-chart-bar"></i>
                      Data Sensor
                    </h3>
                  </div>
                  <div class="card-body">
                        <div class="form-group">
                                <label>Masukkan Jangka Waktu</label>
              
                                <div class="input-group">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clock"></i></span>
                                  </div>
                                  <input type="text" class="form-control float-right" id="reservationtime">
                                </div>
                                <!-- /.input group -->
                              </div>
                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Tanggal</th>
                                      <th>Jam</th>
                                      <th>pH</th>
                                      <th>Kekeruhan Air</th>
                                      <th>Kecepatan Air</th>
                                      <th>Kecepatan Udara</th>
                                      <th>Suhu Air</th>
                                      <th>Energi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                      <td>29 Janurai 2020</td>
                                      <td>00.00.00</td>
                                      <td>8.1</td>
                                      <td>10</td>
                                      <td>300</td>
                                      <td>340</td>
                                      <td>30.00</td>
                                      <td>3.3</td>
                                    </tr>
                                    <tr>
                                            <td>29 Janurai 2020</td>
                                            <td>00.00.00</td>
                                            <td>8.1</td>
                                            <td>10</td>
                                            <td>300</td>
                                            <td>340</td>
                                            <td>30.00</td>
                                            <td>3.3</td>
                                          </tr>
                                          <tr>
                                                <td>29 Janurai 2020</td>
                                                <td>00.00.00</td>
                                                <td>8.1</td>
                                                <td>10</td>
                                                <td>300</td>
                                                <td>340</td>
                                                <td>30.00</td>
                                                <td>3.3</td>
                                              </tr>
                                              <tr>
                                                    <td>29 Janurai 2020</td>
                                                    <td>00.00.00</td>
                                                    <td>8.1</td>
                                                    <td>10</td>
                                                    <td>300</td>
                                                    <td>340</td>
                                                    <td>30.00</td>
                                                    <td>3.3</td>
                                                  </tr>
                                                  <tr>
                                                        <td>29 Janurai 2020</td>
                                                        <td>00.00.00</td>
                                                        <td>8.1</td>
                                                        <td>10</td>
                                                        <td>300</td>
                                                        <td>340</td>
                                                        <td>30.00</td>
                                                        <td>3.3</td>
                                                      </tr>
                                                      <tr>
                                                            <td>29 Janurai 2020</td>
                                                            <td>00.00.00</td>
                                                            <td>8.1</td>
                                                            <td>10</td>
                                                            <td>300</td>
                                                            <td>340</td>
                                                            <td>30.00</td>
                                                            <td>3.3</td>
                                                          </tr>
                                                                                                          
                                    
                                  </table>
                  </div>
                  <!-- /.card-body-->
                  <div class="card-footer">
                    <button type="button" class="btn btn-primary"><i class="fas fa-download"></i> Unduh Semua Log Data</button>
                  </div>
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