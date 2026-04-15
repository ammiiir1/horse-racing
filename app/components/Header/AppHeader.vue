<template>
  <header class="app-header">
    <div class="content-wrapper">
      <h1 class="app-title">Horse Racing</h1>
      <nav>
        <ul>
          <NuxtLink :to="{ name: 'index' }" v-slot="{ href, navigate }" custom>
            <li @click="navigate">
              <a :href="href">Horses Details</a>
            </li>
          </NuxtLink>
          <NuxtLink :to="{ name: 'programs' }" v-slot="{ href, navigate }" custom>
            <li @click="navigate">
              <a :href="href">Start a Race</a>
            </li>
          </NuxtLink>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style src="./AppHeader.scss" lang="scss"></style>
