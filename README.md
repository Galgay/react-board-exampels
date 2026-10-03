# React 게시판 실습

HTML, CSS, JavaScript로 만든 게시판을 React로 다시 구현한 실습 프로젝트입니다. 기존 화면을 바탕으로 컴포넌트, Props, State, Router를 적용하고 서버 API와 연결합니다.

## 주요 기능

- 로그인·로그아웃
- 게시글 목록·상세 조회와 작성
- 게시글 페이지 이동
- 댓글 조회와 작성

## 실행

Spring API 서버를 `http://127.0.0.1:8080`에서 실행합니다. 다른 주소를 사용한다면 `src/api.js`의 `API_BASE_URL`을 변경합니다.

```sh
npm install
npm run dev
```

Vite가 표시하는 로컬 주소로 접속합니다. API 요청은 Vite 프록시를 거치지 않고 Spring 서버로 직접 전송됩니다.

## Spring API의 CORS 설정

브라우저에서 React와 Spring API의 주소가 다르므로 Spring Security에서 CORS를 허용해야 합니다.

`SecurityConfig` 또는 Spring Security 설정 파일에 다음 CORS 설정을 추가합니다.
```arduino
@Bean
public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of("http://127.0.0.1:5173"));
    config.setAllowedMethods(List.of("GET", "POST", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/api/**", config);
    return source;
}
```

기존 `SecurityFilterChain` 설정에서는 CORS를 활성화합니다.
```less
http
    .cors(Customizer.withDefaults())
    .csrf(AbstractHttpConfigurer::disable);
```

React 개발 서버는 기본 포트인 5173에서 실행해야 이 CORS 주소와 일치합니다.
