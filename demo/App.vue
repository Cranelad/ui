<template>
  <div class="demo">
    <!-- Site header -->
    <header class="site-header" data-demo="header">
      <navbar dark type="black" fluid menu-classes="ms-auto">
        <template #default>
          <a class="navbar-brand" href="#">Cranelad</a>
        </template>
        <template #navbar-menu>
          <li class="nav-item"><nav-link href="#">Home</nav-link></li>
          <li class="nav-item"><nav-link href="#">Careers</nav-link></li>
          <drop-down tag="li" title="More" toggle-classes="nav-link" align="end">
            <li><nav-link href="#">First</nav-link></li>
            <li><nav-link href="#">Second</nav-link></li>
          </drop-down>
        </template>
      </navbar>
    </header>

    <!-- Sections -->
    <section class="section" data-demo="sections">
      <div class="container">
        <h2 class="section-title">Section title</h2>
        <p class="section-lead">
          A section lead: centred, larger text under the title. Sections are separated by a thin blue line.
        </p>
      </div>
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
        <p class="lead">Lead paragraph, the quick brown fox jumps over the lazy dog.</p>
        <p>Paragraph with <a href="#">a link</a>, <strong>strong</strong>, <small>small</small> and <code>code</code>.</p>
        <p class="text-body-secondary">Secondary text.</p>
        <p>
          <a href="#" class="link-arrow">Link with an arrow <i class="ti ti-arrow-right" aria-hidden="true"></i></a>
        </p>
        <p class="d-flex flex-wrap gap-3">
          <span v-for="color in colors" :key="color" :class="`text-${color}`">{{ color }}</span>
        </p>
        <blockquote class="blockquote"><p class="mb-0">A blockquote.</p></blockquote>
        <hr>
        <ul><li>List item</li><li>List item</li></ul>
      </section>

      <!-- Buttons -->
      <section data-demo="buttons" class="demo-block">
        <div v-for="variant in buttonVariants" :key="variant" class="mb-2">
          <button
            v-for="color in colors"
            :key="color"
            type="button"
            class="btn me-1 mb-1"
            :class="[variant.startsWith('outline') ? `btn-outline-${color}` : `btn-${color}`, { 'rounded-pill': variant.endsWith('pill') }]"
          >{{ color }}</button>
        </div>
        <div class="mb-2">
          <button class="btn btn-primary btn-sm me-1">Small</button>
          <button class="btn btn-primary me-1">Regular</button>
          <button class="btn btn-primary btn-lg me-1">Large</button>
          <button class="btn btn-primary me-1" disabled>Disabled</button>
          <button class="btn btn-link">Link button</button>
        </div>
        <div class="mb-2">
          <n-button class="me-1">n-button</n-button>
          <n-button type="success" round class="me-1">round</n-button>
          <n-button type="info" outline class="me-1">outline</n-button>
          <n-button type="warning" size="sm" class="me-1">small</n-button>
          <n-button size="lg" round class="me-1">large round</n-button>
          <n-button loading class="me-1">loading</n-button>
          <n-button type="link">link</n-button>
        </div>
        <div class="mb-2">
          <n-button icon round class="me-1" aria-label="Favourite"><i class="ti ti-heart" /></n-button>
          <n-button type="info" icon class="me-1" aria-label="Settings"><i class="ti ti-settings" /></n-button>
          <n-button type="danger" icon round size="sm" class="me-1" aria-label="Remove"><i class="ti ti-x" /></n-button>
          <n-button type="success" icon round size="lg" aria-label="Done"><i class="ti ti-check" /></n-button>
        </div>
        <div style="max-width: 320px">
          <n-button block round class="mb-2">block</n-button>
        </div>
        <div class="btn-group" role="group">
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
            <fg-input label="Required" required placeholder="Required input" />
            <fg-input placeholder="With left icon" addon-left-icon="ti ti-user" />
            <fg-input placeholder="With right icon" addon-right-icon="ti ti-mail" />
            <fg-input label="Error" placeholder="Error" error="This field has an error" model-value="bad value" />
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label" for="demo-plain">Plain form-control</label>
              <input id="demo-plain" class="form-control" placeholder="Placeholder">
              <div class="form-text">Helper text.</div>
            </div>
            <div class="mb-3"><select class="form-select" aria-label="Select"><option>Select</option><option>Two</option></select></div>
            <div class="mb-3"><textarea class="form-control" rows="3" placeholder="Textarea" aria-label="Textarea"></textarea></div>
            <div class="mb-3"><input class="form-control" disabled value="Disabled" aria-label="Disabled"></div>
            <div class="form-check">
              <input id="demo-check" class="form-check-input" type="checkbox" checked>
              <label class="form-check-label" for="demo-check">Checkbox</label>
            </div>
            <div class="form-check form-switch">
              <input id="demo-switch" class="form-check-input" type="checkbox" role="switch">
              <label class="form-check-label" for="demo-switch">Switch</label>
            </div>
          </div>
        </div>
      </section>

      <!-- Cards -->
      <section data-demo="cards" class="demo-block">
        <div class="row g-4">
          <div class="col-md-4 d-flex">
            <article class="card text-bg-info w-100 text-center">
              <div class="card-body">
                <h3 class="card-title h4">Blue card</h3>
                <p class="card-text">text-bg-info with a btn-ghost button.</p>
                <a href="#" class="btn btn-ghost rounded-pill">Visit Now</a>
              </div>
            </article>
          </div>
          <div class="col-md-4 d-flex">
            <card class="w-100" title="Card component" sub-title="Subtitle" description="White by default, for dashboards and forms.">
              <template #footer>Footer</template>
            </card>
          </div>
          <div class="col-md-4 d-flex">
            <card class="w-100" color="primary" title="Coloured card" description="The color prop: text-bg-primary." />
          </div>
        </div>
      </section>

      <!-- Alerts -->
      <section data-demo="alerts" class="demo-block">
        <alert v-for="type in colors" :key="type" :type="type">
          <strong>{{ type }}</strong> alert with <a href="#" class="alert-link">a link</a>.
        </alert>
        <alert type="info" dismissible><strong>Dismissible</strong> alert.</alert>
      </section>

      <!-- Dropdowns -->
      <section data-demo="dropdowns" class="demo-block">
        <drop-down title="DropDown" icon="ti ti-apps" class="d-inline-block me-2">
          <li><nav-link href="#">First</nav-link></li>
          <li><nav-link href="#">Second</nav-link></li>
        </drop-down>
        <div class="dropdown d-inline-block">
          <div class="dropdown-menu show position-static">
            <h6 class="dropdown-header">Header</h6>
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item active" href="#">Active</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item disabled" href="#">Disabled</a>
          </div>
        </div>
      </section>

      <!-- Navbars -->
      <section data-demo="navbars" class="demo-block">
        <navbar v-for="type in ['primary', 'info', 'body']" :key="type" :type="type" :dark="type !== 'body'" class="mb-2" menu-classes="ms-auto">
          <template #default><a class="navbar-brand" href="#">Navbar {{ type }}</a></template>
          <template #navbar-menu>
            <li class="nav-item"><nav-link href="#">Link</nav-link></li>
            <li class="nav-item"><nav-link href="#">Another</nav-link></li>
          </template>
        </navbar>
      </section>

      <!-- Badges, progress, pagination, pills, table -->
      <section data-demo="misc" class="demo-block">
        <p>
          <span v-for="color in colors" :key="color" class="badge me-1" :class="`text-bg-${color}`">{{ color }}</span>
        </p>
        <div class="progress mb-3" role="progressbar" aria-label="Progress" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width: 60%">60%</div>
        </div>
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">«</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item disabled"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
        <ul class="nav nav-pills mb-3">
          <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
        </ul>
        <table class="table">
          <thead><tr><th>Name</th><th>Role</th></tr></thead>
          <tbody><tr><td>Admin</td><td>admin</td></tr><tr><td>User</td><td>user</td></tr></tbody>
        </table>
      </section>

      <!-- Icons -->
      <section data-demo="icons" class="demo-block">
        <span v-for="icon in icons" :key="icon" class="demo-icon" :title="icon">
          <i class="ti" :class="`ti-${icon}`" aria-hidden="true"></i>
          <small>{{ icon }}</small>
        </span>
      </section>
    </div>

    <!-- Site footer -->
    <footer class="site-footer" data-demo="footer">
      <div class="container">
        <ul class="site-footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
        <div class="site-footer-copyright">Copyright © Cranelad. All Rights Reserved</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { Navbar, NavLink, DropDown, Alert, Card } from '@cranelad/ui';
import icons from '../scripts/icons.mjs';

export default {
  name: 'DemoApp',
  components: { Navbar, NavLink, DropDown, Alert, Card },
  data: () => ({
    icons,
    colors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    buttonVariants: ['filled', 'filled pill', 'outline', 'outline pill']
  })
};
</script>

<style>
.demo-block {
  padding: 32px 0;
  border-bottom: 1px solid var(--bs-border-color);
}

.demo-icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 96px;
  margin: 0 8px 16px 0;
  font-size: 24px;
  color: var(--bs-primary);
}

.demo-icon small {
  margin-top: 4px;
  font-size: 11px;
  color: var(--bs-secondary-color);
}
</style>
