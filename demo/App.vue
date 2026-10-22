<template>
  <div class="demo">
    <!-- Navbars -->
    <section data-demo="navbars">
      <navbar v-for="type in navbarTypes" :key="type" :type="type" position="relative" menu-classes="ms-auto" :expand="'lg'">
        <template #default>
          <a class="navbar-brand" href="#">Navbar {{ type }}</a>
        </template>
        <template #navbar-menu>
          <li class="nav-item"><nav-link class="nav-link" href="#"><i class="now-ui-icons arrows-1_cloud-download-93"></i> Link</nav-link></li>
          <li class="nav-item active"><nav-link class="nav-link" href="#">Active</nav-link></li>
          <li class="nav-item"><a class="nav-link btn btn-neutral" href="#">Button</a></li>
        </template>
      </navbar>
      <navbar type="primary" position="relative" transparent menu-classes="ms-auto">
        <template #default><a class="navbar-brand" href="#">Transparent</a></template>
        <template #navbar-menu><li class="nav-item"><a class="nav-link" href="#">Link</a></li></template>
      </navbar>
    </section>

    <div class="container">
      <!-- Typography -->
      <section data-demo="typography" class="demo-block">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <h2 class="title">Title</h2>
        <h3 class="title title-up">Title up</h3>
        <p class="category">Category</p>
        <p class="description">Description text, the quick brown fox jumps over the lazy dog.</p>
        <p>Paragraph with <a href="#">a link</a>, <strong>strong</strong>, <small>small</small> and <code>code</code>.</p>
        <p>
          <span class="text-primary">primary</span> ·
          <span class="text-info">info</span> ·
          <span class="text-success">success</span> ·
          <span class="text-warning">warning</span> ·
          <span class="text-danger">danger</span> ·
          <span class="text-black">black</span> ·
          <span class="text-muted">muted</span>
        </p>
        <blockquote class="blockquote blockquote-primary"><p class="mb-0">Primary blockquote.</p><br><small>— Someone</small></blockquote>
        <blockquote class="blockquote blockquote-danger"><p class="mb-0">Danger blockquote.</p></blockquote>
        <hr>
        <ul><li>List item</li><li>List item</li></ul>
      </section>

      <!-- Buttons -->
      <section data-demo="buttons" class="demo-block">
        <div v-for="variant in buttonVariants" :key="variant.label" class="mb-2">
          <button v-for="color in colors" :key="color" type="button" class="btn" :class="[`btn-${color}`, variant.classes]">{{ color }}</button>
        </div>
        <div class="mb-2">
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Regular</button>
          <button class="btn btn-primary btn-lg">Large</button>
          <button class="btn btn-primary btn-wd">Wide</button>
          <button class="btn btn-primary" disabled>Disabled</button>
          <button class="btn btn-primary active">Active</button>
          <button class="btn btn-link">Link button</button>
        </div>
        <div class="mb-2">
          <button class="btn btn-primary btn-icon btn-round"><i class="now-ui-icons ui-2_favourite-28"></i></button>
          <button class="btn btn-info btn-icon"><i class="now-ui-icons ui-1_settings-gear-63"></i></button>
          <button class="btn btn-danger btn-icon btn-round btn-sm"><i class="now-ui-icons ui-1_simple-remove"></i></button>
          <button class="btn btn-success btn-icon btn-round btn-lg"><i class="now-ui-icons ui-1_check"></i></button>
        </div>
        <div class="mb-2">
          <n-button type="primary">n-button</n-button>
          <n-button type="success" round>round</n-button>
          <n-button type="info" simple>simple</n-button>
          <n-button type="warning" size="sm">small</n-button>
          <n-button type="danger" size="lg" round>large round</n-button>
          <n-button type="neutral" link>link</n-button>
        </div>
        <div style="max-width: 320px">
          <n-button type="primary" block round>block</n-button>
          <n-button type="info" block>block</n-button>
        </div>
        <div class="btn-group mt-2" role="group">
          <button class="btn btn-info">Left</button>
          <button class="btn btn-info">Middle</button>
          <button class="btn btn-info">Right</button>
        </div>
      </section>

      <!-- Inputs -->
      <section data-demo="inputs" class="demo-block">
        <div class="row">
          <div class="col-md-6">
            <fg-input label="Label" placeholder="Regular input" />
            <fg-input placeholder="With left icon" addon-left-icon="now-ui-icons users_single-02" />
            <fg-input placeholder="With right icon" addon-right-icon="now-ui-icons ui-1_email-85" />
            <fg-input placeholder="Error" error="This field has an error" model-value="bad value" />
            <fg-input class="no-border input-lg" placeholder="No border, large, icon" addon-left-icon="now-ui-icons ui-1_lock-circle-open" />
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Plain form-control</label>
              <input class="form-control" placeholder="Placeholder">
              <small class="form-text text-muted">Helper text.</small>
            </div>
            <div class="form-group has-success"><input class="form-control" value="has-success"></div>
            <div class="form-group has-danger"><input class="form-control is-invalid" value="has-danger"><div class="invalid-feedback d-block">Invalid feedback.</div></div>
            <div class="form-group"><select class="form-control"><option>Select</option><option>Two</option></select></div>
            <div class="form-group"><textarea class="form-control" rows="3" placeholder="Textarea"></textarea></div>
            <div class="form-group"><input class="form-control" disabled value="Disabled"></div>
          </div>
        </div>
      </section>

      <!-- Progress -->
      <section data-demo="progress" class="demo-block">
        <div v-for="color in ['', ...colorsNoDefault]" :key="color" class="progress-container" :class="color ? `progress-${color}` : ''">
          <span class="progress-badge">{{ color || 'default' }}</span>
          <div class="progress">
            <div class="progress-bar" role="progressbar" :style="{ width: '60%' }"><span class="progress-value">60%</span></div>
          </div>
        </div>
      </section>

      <!-- Pagination -->
      <section data-demo="pagination" class="demo-block">
        <ul v-for="color in ['', ...colorsNoDefault]" :key="color" class="pagination" :class="color ? `pagination-${color}` : ''">
          <li class="page-item"><a class="page-link" href="#">«</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item disabled"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </section>

      <!-- Pills -->
      <section data-demo="pills" class="demo-block">
        <ul v-for="color in ['', ...colorsNoDefault]" :key="color" class="nav nav-pills" :class="color ? `nav-pills-${color}` : ''">
          <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
        </ul>
        <ul class="nav nav-pills nav-pills-primary nav-pills-just-icons mt-3">
          <li class="nav-item"><a class="nav-link active" href="#"><i class="now-ui-icons objects_umbrella-13"></i></a></li>
          <li class="nav-item"><a class="nav-link" href="#"><i class="now-ui-icons shopping_cart-simple"></i></a></li>
        </ul>
        <ul class="nav nav-pills flex-column mt-3" style="max-width: 200px">
          <li class="nav-item"><a class="nav-link active" href="#">Vertical</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Pills</a></li>
        </ul>
      </section>

      <!-- Icons -->
      <section data-demo="icons" class="demo-block">
        <i v-for="icon in icons" :key="icon" class="now-ui-icons demo-icon" :class="icon"></i>
      </section>

      <!-- Dropdowns -->
      <section data-demo="dropdowns" class="demo-block">
        <div class="row">
          <div v-for="color in ['', 'primary', 'info', 'success', 'warning', 'danger']" :key="color" class="col-md-2">
            <div class="dropdown" :class="color ? `dropdown-${color}` : ''">
              <button class="btn btn-default dropdown-toggle" type="button">{{ color || 'default' }}</button>
              <div class="dropdown-menu show position-static">
                <h6 class="dropdown-header">Header</h6>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item active" href="#">Active</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item disabled" href="#">Disabled</a>
              </div>
            </div>
          </div>
        </div>
        <ul class="navbar-nav mt-3" data-demo-dropdown>
          <drop-down title="DropDown component" icon="now-ui-icons design_app" class="nav-item">
            <a class="dropdown-item" href="#">First</a>
            <a class="dropdown-item" href="#">Second</a>
          </drop-down>
        </ul>
      </section>

      <!-- Alerts -->
      <section data-demo="alerts" class="demo-block">
        <alert v-for="type in ['primary', 'info', 'success', 'warning', 'danger']" :key="type" :type="type">
          <div class="alert-icon"><i class="now-ui-icons ui-2_like"></i></div>
          <strong>{{ type }}</strong> alert with <a href="#" class="alert-link">a link</a>.
        </alert>
        <alert type="info" dismissible><strong>Dismissible</strong> alert.</alert>
        <div class="alert alert-danger alert-dismissible" role="alert">
          <button type="button" class="close" aria-label="Dismiss"><span aria-hidden="true">×</span></button>
          vform-style dismissible alert.
        </div>
      </section>

      <!-- Cards -->
      <section data-demo="cards" class="demo-block">
        <div class="row">
          <div class="col-md-4">
            <card title="Card title" sub-title="Subtitle" description="Description">
              Card body text.
              <template #footer><div class="stats">Footer</div></template>
            </card>
          </div>
          <div class="col-md-4">
            <card plain><h4 class="card-title">Plain card</h4><p class="card-description">Plain card description.</p></card>
          </div>
          <div class="col-md-4">
            <card color="orange"><h4 class="card-title">Orange background</h4><p>data-background-color</p></card>
          </div>
          <div class="col-md-4">
            <div class="card" data-background-color="blue"><div class="card-body"><h4 class="card-title">Blue</h4><p class="card-description">Description</p></div></div>
          </div>
          <div class="col-md-4">
            <div class="card" data-background-color="red"><div class="card-body"><h4 class="card-title">Red</h4></div></div>
          </div>
          <div class="col-md-4">
            <div class="card card-signup" data-background-color="orange">
              <div class="card-header text-center"><h3 class="card-title title-up">Sign Up</h3></div>
              <div class="card-body">
                <fg-input class="no-border" placeholder="Name" addon-left-icon="now-ui-icons users_circle-08" />
              </div>
              <div class="card-footer text-center"><a href="#" class="btn btn-neutral btn-round btn-lg">Get Started</a></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popovers / tooltips (static) -->
      <section data-demo="popups" class="demo-block">
        <div class="row">
          <div class="col-md-6">
            <div class="popover bs-popover-bottom popover-primary position-relative d-block" role="tooltip">
              <div class="popover-arrow arrow"></div>
              <h3 class="popover-header">Popover</h3>
              <div class="popover-body">Popover body text.</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="tooltip bs-tooltip-top position-relative show d-inline-block" role="tooltip">
              <div class="tooltip-arrow arrow"></div>
              <div class="tooltip-inner">Tooltip</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Images -->
      <section data-demo="images" class="demo-block">
        <img :src="placeholder" class="img-raised rounded" width="160" height="120" alt="">
        <img :src="placeholder" class="img-raised rounded-circle ms-3" width="120" height="120" alt="">
        <img :src="placeholder" class="img-thumbnail ms-3" width="160" height="120" alt="">
      </section>
    </div>

    <!-- Sections -->
    <section data-demo="sections">
      <div class="page-header page-header-small clear-filter" filter-color="blue">
        <div class="page-header-image" :style="{ backgroundColor: '#2c2c2c' }"></div>
        <div class="content-center">
          <h1 class="title">Page header</h1>
          <p class="category">page-header-small</p>
        </div>
      </div>
      <div class="section">
        <div class="container text-center">
          <h2 class="title">Section</h2>
          <p class="description">Default section.</p>
        </div>
      </div>
      <div class="section section-signup" data-background-color="black">
        <div class="container"><h3 class="title text-white">section-signup</h3></div>
      </div>
    </section>

    <!-- Footers -->
    <section data-demo="footers">
      <footer v-for="color in ['', 'black', 'blue', 'orange']" :key="color" class="footer" :data-background-color="color || null">
        <div class="container">
          <nav><ul><li><a href="#">About</a></li><li><a href="#">Blog</a></li></ul></nav>
          <div class="copyright">© Footer {{ color || 'default' }}</div>
        </div>
      </footer>
      <footer class="footer footer-default"><div class="container"><div class="copyright">footer-default</div></div></footer>
    </section>
  </div>
</template>

<script>
import { Navbar, NavLink, DropDown, Alert, Card } from '@cranelad/ui';

// 1x1 grey PNG, so the demo needs no image files.
const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+f9/PQAJpAPj2lDdHAAAAABJRU5ErkJggg==';

export default {
  name: 'DemoApp',
  components: { Navbar, NavLink, DropDown, Alert, Card },
  data: () => ({
    placeholder,
    navbarTypes: ['white', 'default', 'primary', 'info', 'success', 'warning', 'danger', 'black'],
    colors: ['default', 'primary', 'info', 'success', 'warning', 'danger', 'neutral'],
    colorsNoDefault: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
    buttonVariants: [
      { label: 'regular', classes: '' },
      { label: 'round', classes: 'btn-round' },
      { label: 'simple', classes: 'btn-simple' },
      { label: 'simple round', classes: 'btn-simple btn-round' },
      { label: 'link', classes: 'btn-link' }
    ],
    icons: [
      'ui-1_check', 'ui-1_simple-remove', 'ui-1_email-85', 'ui-1_lock-circle-open', 'ui-1_settings-gear-63',
      'ui-2_favourite-28', 'ui-2_like', 'users_single-02', 'users_circle-08', 'arrows-1_cloud-download-93',
      'design_app', 'objects_umbrella-13', 'shopping_cart-simple', 'tech_mobile', 'location_world'
    ]
  })
};
</script>

<style>
.demo-block {
  padding: 32px 0;
  border-bottom: 1px solid #eee;
}

.demo-icon {
  font-size: 24px;
  margin: 0 12px 12px 0;
}
</style>
