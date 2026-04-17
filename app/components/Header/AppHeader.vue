<template>
  <header class="app-header">
    <div class="content-wrapper">
      <h1 class="app-title">Horse Racing</h1>
      <nav>
        <ul>
          <NuxtLink v-slot="{ href, navigate, isActive }" :to="{ name: 'index' }" custom>
            <li data-testid="horses-statistics-link" @click="navigate">
              <a :href="href" :class="{ 'text-primary': isActive }">Horses Statistics</a>
            </li>
          </NuxtLink>
          <NuxtLink v-slot="{ href, navigate, isActive }" :to="{ name: 'programs' }" custom>
            <li data-testid="race-programs-link" @click="navigate">
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
