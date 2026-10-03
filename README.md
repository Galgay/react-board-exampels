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

프런트엔드와 API의 출처가 다르므로 Spring 프로젝트의 `src/main/java/com/green_computer/green_board/global/SecurityConfig.java`를 수정해야 합니다. 해당 파일에 다음 import와 Bean을 추가하고, 기존 `filterChain`의 `http` 설정에 `.cors(Customizer.withDefaults())`를 넣습니다.

```java
import java.util.List;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// SecurityConfig 클래스 내부
@Bean
public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOriginPatterns(List.of("http://127.0.0.1:[*]", "http://localhost:[*]"));
    config.setAllowedMethods(List.of("GET", "POST", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}

// 기존 filterChain 메서드의 http 설정 시작 부분
http
    .cors(Customizer.withDefaults())
    .csrf(AbstractHttpConfigurer::disable)
    // 나머지 기존 설정은 그대로 유지
```

이 설정은 로컬 개발 환경의 임의 포트에서 실행하는 게시판을 허용합니다. API 주소가 `127.0.0.1:8080`이 아니라면 프런트엔드의 `API_BASE_URL`도 함께 변경합니다.
