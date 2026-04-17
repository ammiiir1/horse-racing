<template>
  <header class="app-header">
    <div class="content-wrapper">
      <h1 class="app-title">Horse Racing</h1>
      <nav>
        <ul>
          <NuxtLink :to="{ name: 'index' }" v-slot="{ href, navigate, isActive }" custom>
            <li @click="navigate" data-testid="horses-statistics-link">
              <a :href="href" :class="{ 'text-primary': isActive }">Horses Statistics</a>
            </li>
          </NuxtLink>
          <NuxtLink :to="{ name: 'programs' }" v-slot="{ href, navigate, isActive }" custom>
            <li @click="navigate" data-testid="race-programs-link">
              <a :href="href" :class="{ 'text-primary': isActive }">Race Programs</a>
            </li>
          </NuxtLink>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style src="./AppHeader.scss" lang="scss"></style>
