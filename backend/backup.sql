--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answer" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "examID" text NOT NULL,
    "questionID" integer NOT NULL,
    answer text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer
);


ALTER TABLE public."Answer" OWNER TO postgres;

--
-- Name: Answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Answer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Answer_id_seq" OWNER TO postgres;

--
-- Name: Answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Answer_id_seq" OWNED BY public."Answer".id;


--
-- Name: Course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    "courseCode" text NOT NULL,
    "courseTitle" text NOT NULL,
    "courseDescription" text NOT NULL,
    department text NOT NULL,
    credits integer NOT NULL,
    level integer NOT NULL
);


ALTER TABLE public."Course" OWNER TO postgres;

--
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Course_id_seq" OWNER TO postgres;

--
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- Name: Enrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Enrollment" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "courseId" integer NOT NULL,
    "enrollmentDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "examId" integer
);


ALTER TABLE public."Enrollment" OWNER TO postgres;

--
-- Name: Enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Enrollment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Enrollment_id_seq" OWNER TO postgres;

--
-- Name: Enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Enrollment_id_seq" OWNED BY public."Enrollment".id;


--
-- Name: Exam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Exam" (
    id integer NOT NULL,
    "examID" text NOT NULL,
    "examTitle" text NOT NULL,
    "courseId" integer NOT NULL,
    "examDate" timestamp(3) without time zone NOT NULL,
    "examTime" text NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public."Exam" OWNER TO postgres;

--
-- Name: ExamAttempt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExamAttempt" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "examID" text NOT NULL,
    "examDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "totalScore" integer NOT NULL,
    grade text NOT NULL,
    "attemptDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ExamAttempt" OWNER TO postgres;

--
-- Name: ExamAttempt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExamAttempt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ExamAttempt_id_seq" OWNER TO postgres;

--
-- Name: ExamAttempt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExamAttempt_id_seq" OWNED BY public."ExamAttempt".id;


--
-- Name: Exam_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Exam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Exam_id_seq" OWNER TO postgres;

--
-- Name: Exam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exam_id_seq" OWNED BY public."Exam".id;


--
-- Name: PasswordReset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordReset" (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."PasswordReset" OWNER TO postgres;

--
-- Name: PasswordReset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PasswordReset_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PasswordReset_id_seq" OWNER TO postgres;

--
-- Name: PasswordReset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PasswordReset_id_seq" OWNED BY public."PasswordReset".id;


--
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    "questionID" text NOT NULL,
    "questionText" text NOT NULL,
    "questionType" text NOT NULL,
    "correctAnswer" text NOT NULL,
    "examID" text NOT NULL,
    options text[]
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- Name: Question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Question_id_seq" OWNER TO postgres;

--
-- Name: Question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Question_id_seq" OWNED BY public."Question".id;


--
-- Name: Result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Result" (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    grade text NOT NULL,
    "studentID" integer NOT NULL,
    "examAttemptID" integer NOT NULL,
    "examID" text NOT NULL,
    "totalScore" integer NOT NULL,
    "courseTitle" text NOT NULL,
    credits integer NOT NULL,
    department text NOT NULL,
    "examDate" timestamp(3) without time zone NOT NULL,
    "examTitle" text NOT NULL,
    level integer NOT NULL,
    "studentName" text
);


ALTER TABLE public."Result" OWNER TO postgres;

--
-- Name: Result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Result_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Result_id_seq" OWNER TO postgres;

--
-- Name: Result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Result_id_seq" OWNED BY public."Result".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    department text NOT NULL,
    level text NOT NULL,
    password text NOT NULL,
    "studentID" integer NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- Name: StudentExam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StudentExam" (
    id integer NOT NULL,
    "studentID" integer NOT NULL,
    "examId" integer NOT NULL,
    score integer NOT NULL,
    submitted boolean DEFAULT false NOT NULL,
    "submittedAt" timestamp(3) without time zone
);


ALTER TABLE public."StudentExam" OWNER TO postgres;

--
-- Name: StudentExam_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StudentExam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StudentExam_id_seq" OWNER TO postgres;

--
-- Name: StudentExam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StudentExam_id_seq" OWNED BY public."StudentExam".id;


--
-- Name: Student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Student_id_seq" OWNER TO postgres;

--
-- Name: Student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Student_id_seq" OWNED BY public."Student".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "roleId" integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Answer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer" ALTER COLUMN id SET DEFAULT nextval('public."Answer_id_seq"'::regclass);


--
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- Name: Enrollment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment" ALTER COLUMN id SET DEFAULT nextval('public."Enrollment_id_seq"'::regclass);


--
-- Name: Exam id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exam" ALTER COLUMN id SET DEFAULT nextval('public."Exam_id_seq"'::regclass);


--
-- Name: ExamAttempt id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamAttempt" ALTER COLUMN id SET DEFAULT nextval('public."ExamAttempt_id_seq"'::regclass);


--
-- Name: PasswordReset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordReset" ALTER COLUMN id SET DEFAULT nextval('public."PasswordReset_id_seq"'::regclass);


--
-- Name: Question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question" ALTER COLUMN id SET DEFAULT nextval('public."Question_id_seq"'::regclass);


--
-- Name: Result id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result" ALTER COLUMN id SET DEFAULT nextval('public."Result_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: Student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);


--
-- Name: StudentExam id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentExam" ALTER COLUMN id SET DEFAULT nextval('public."StudentExam_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Answer" (id, "studentID", "examID", "questionID", answer, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Course" (id, "courseCode", "courseTitle", "courseDescription", department, credits, level) FROM stdin;
1	CSC101	Discrete Mathematics for Computer Science	This course covers fundamental mathematical concepts used in computer science, including logic, set theory, functions, relations, combinatorics, and graph theory. These topics provide a foundation for algorithms, data structures, and computational theory	Computer Science	3	100
\.


--
-- Data for Name: Enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Enrollment" (id, "studentID", "courseId", "enrollmentDate", "examId") FROM stdin;
1	1	1	2024-12-10 14:16:37.313	1
\.


--
-- Data for Name: Exam; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Exam" (id, "examID", "examTitle", "courseId", "examDate", "examTime", duration) FROM stdin;
1	EXAM001	Midterm Examination	1	2025-03-23 00:00:00	10:00 AM	5400
\.


--
-- Data for Name: ExamAttempt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExamAttempt" (id, "studentID", "examID", "examDate", "totalScore", grade, "attemptDate") FROM stdin;
\.


--
-- Data for Name: PasswordReset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PasswordReset" (id, token, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id, "courseId", "questionID", "questionText", "questionType", "correctAnswer", "examID", options) FROM stdin;
1	1	CSC101_EXAM001_QSTN001	What is the principle of mathematical induction?	MCQ	A proof technique used to prove a statement is true for all natural numbers	EXAM001	{"A method to solve equations involving inequalities","A proof technique used to prove a statement is true for all natural numbers","A process of adding numbers in a sequence","A method for integrating functions"}
2	1	CSC101_EXAM001_QSTN002	In set theory, what is the intersection of two sets A and B?	MCQ	The set containing all elements common to both A and B	EXAM001	{"The set containing all elements in A or B","The set containing all elements only in A","The set containing all elements common to both A and B","The set containing all elements only in B"}
3	1	CSC101_EXAM001_QSTN003	Which of the following is a property of an equivalence relation?	MCQ	Reflexivity, Symmetry, Transitivity	EXAM001	{"Associativity, Reflexivity, Transitivity","Reflexivity, Symmetry, Transitivity","Commutativity, Symmetry, Antisymmetry","Symmetry, Antisymmetry, Associativity"}
4	1	CSC101_EXAM001_QSTN004	What is the primary purpose of a truth table in logic?	MCQ	To display the truth values of a logical expression for all possible inputs	EXAM001	{"To compute the values of variables","To visually represent set relations","To display the truth values of a logical expression for all possible inputs","To list all mathematical properties"}
5	1	CSC101_EXAM001_QSTN005	Which graph traversal algorithm uses a queue data structure?	MCQ	Breadth-First Search	EXAM001	{"Depth-First Search","Breadth-First Search","Dijkstra\\\\u2019s Algorithm","Kruskal's Algorithm"}
\.


--
-- Data for Name: Result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Result" (id, "courseId", grade, "studentID", "examAttemptID", "examID", "totalScore", "courseTitle", credits, department, "examDate", "examTitle", level, "studentName") FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name) FROM stdin;
1	admin
2	moderator
3	user
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" (id, name, email, department, level, password, "studentID", "roleId") FROM stdin;
1	Bukayo Saka	bukayo7@example.com	Computer Science	100	$2a$10$amQ6uQ56I4uuVz0vb.5g5e7NFLur1gYfN9jroJL6uvLCppA6Vo3va	7	3
\.


--
-- Data for Name: StudentExam; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentExam" (id, "studentID", "examId", score, submitted, "submittedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, "roleId", name) FROM stdin;
1	waynecosy@gmail.com	$2a$10$kfeziFXTnmoe1SS1.i/Da.oVPcrzfNuux5FZNAINdwThMAwj.FVq2	1	Ahakiri Cosmas Uke
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
992e67f0-f041-4a04-ac16-bbadbb029cce	a8941d172a4a2d606e130c9628b368051520a9b5fcf27aaf0ed6cb1f3014da90	2024-12-10 06:08:37.518137-08	20241105155202_update_result_to_totalscore	\N	\N	2024-12-10 06:08:37.512344-08	1
ef8d2e84-8c09-471b-94d7-7048728e72bf	11d30aeec0418fe489277e1e161ebe24249ed8c7ef0117e638ea21a55ee29b37	2024-12-10 06:08:37.105133-08	20240808131714_init	\N	\N	2024-12-10 06:08:37.008934-08	1
dbdb3b57-a720-491d-b99b-d4ec38f0049d	f14af36a1b8280dc28f75fa0ca56e7ae4f4f1c76afc77bc55da9b6fd63565a67	2024-12-10 06:08:37.384554-08	20240909130441_added_role_id	\N	\N	2024-12-10 06:08:37.378815-08	1
64ad4a50-f4c8-4745-ab2d-7181a6f780df	155ef3e059d59b4cdf6b8d4b903802341bf2071f9beb64523e7324b7f9aad70e	2024-12-10 06:08:37.213147-08	20240810140312_add_student_course_exam_models	\N	\N	2024-12-10 06:08:37.106715-08	1
3f107461-2c82-4ef9-976c-9bf8c650e074	6853f42ae69239976b84d058430774c8faa83488545e84162844dab84b47294d	2024-12-10 06:08:37.218628-08	20240815140429_update_user_model	\N	\N	2024-12-10 06:08:37.214716-08	1
83e21bb7-bcbe-47d7-aad4-a98ebb5326f0	09d5d18db6ca84a45ca6014bc5b8c943f44f102a52c38edf5f6aac1390eaf32b	2024-12-10 06:08:37.223665-08	20240820133843_add_password_to_student	\N	\N	2024-12-10 06:08:37.219977-08	1
50f2670c-f269-49fd-baad-74777f9dfafd	dc9016e5131c5efcf7107ee5aaefa97dffd33911b4636987bb97505c64f2e38e	2024-12-10 06:08:37.419767-08	20240910113957_add_password_reset_model	\N	\N	2024-12-10 06:08:37.385961-08	1
01a5a139-ce8a-4b98-a478-6a28c44b9ac1	f58b2dad0e9a7129f34715aabb4b80730848b445ec9e41cf43374c118d3b4d3b	2024-12-10 06:08:37.231232-08	20240822230953_new_migration	\N	\N	2024-12-10 06:08:37.225061-08	1
69baf009-0714-477c-98cd-b63538ed2f7a	a4042b7511ef25326d35a951f2c09d1710d9eea7a8efbd9738003ca5ab970f4b	2024-12-10 06:08:37.248849-08	20240823160459_added_unique_to_the_course_code	\N	\N	2024-12-10 06:08:37.232616-08	1
22659e13-a35a-4bb4-aede-807fa3a40768	6ac5a2b55f5f58f5cc36c8b978f4351d219982de46d137ae094a76acad7047b1	2024-12-10 06:08:37.259353-08	20240825165108_added_correct_answer_into_the_question_model	\N	\N	2024-12-10 06:08:37.251106-08	1
6232e150-1082-48d1-b251-a0935fe977ea	601cd6e7a537bd5b34cdd560b994fd87f62cf6f38a7b5d16e01de1caf110d18f	2024-12-10 06:08:37.460134-08	20241026061450_add_exam_attempt_table	\N	\N	2024-12-10 06:08:37.422113-08	1
3de381c6-b5bd-47c9-b0a7-9852213d7bb4	1e86135ac170ba0100742523d392501f7e362a2906fc6c87f53b19c1d3f218bb	2024-12-10 06:08:37.281086-08	20240826164301_new_migration	\N	\N	2024-12-10 06:08:37.260493-08	1
e180d6b9-8bd1-47e6-a79a-03ddd05637bf	4b1c7dc9f936508bb3697f379e75e2e89f4c55c77b6edb8db6a54a713e7a2172	2024-12-10 06:08:37.299705-08	20240828122707_new_migration	\N	\N	2024-12-10 06:08:37.282314-08	1
ce43718c-deaa-4916-8924-eae5a3e7e4f2	828686b64913db0001a3b32c3dc06da12ef69feae99838dc8992d5d4fb0939e8	2024-12-10 06:08:37.53875-08	20241105162620_remove_question_from_result	\N	\N	2024-12-10 06:08:37.520123-08	1
7a0e797c-cd10-4f3f-ad25-8ddbb97c20ca	ea8cb3750573e9cfad121f4f7375653f10ed5eff88062a63159ff9758f436a04	2024-12-10 06:08:37.327141-08	20240828195356_new_migration	\N	\N	2024-12-10 06:08:37.30239-08	1
665095c2-03a6-4be8-97f9-a89454667e65	fa0959f878d5268a20c8d34551147d60a4b1663d4cb3c87713c5ee6dc0a9bcb5	2024-12-10 06:08:37.467398-08	20241028084021_add_attempt_date_to_exam_attempt	\N	\N	2024-12-10 06:08:37.461649-08	1
2b0a7742-73cb-4b5f-8a13-ad3fdf158812	9e3f42eb3f9428d3e257aa5b902ca4954c5994bf298a0ff0ebcfd8ba374a13c1	2024-12-10 06:08:37.335004-08	20240829220505_new_migration	\N	\N	2024-12-10 06:08:37.328151-08	1
6713b6d0-2df1-427c-859d-e18cd3ef670e	b6c308f119c39da5ebe0fb87dd9adc8bff3e8681d941e77577fec47bc62ccd07	2024-12-10 06:08:37.366754-08	20240902124824_new_migration	\N	\N	2024-12-10 06:08:37.336825-08	1
d4b9cab6-db75-4c49-916b-83f826f265be	6c937b650643d03c45d74875805ca879a9e6469053f4546f131922f9f491bc97	2024-12-10 06:08:37.377353-08	20240902170928_new_migration	\N	\N	2024-12-10 06:08:37.368991-08	1
6d239800-c0f3-44c8-b4b1-c0e0f42176a1	024b6b7de98467aa3f41d711de376aa26b5a396de20de4fb6b49fafde6d2b2df	2024-12-10 06:08:37.474266-08	20241028085229_add_back_reference_to_question	\N	\N	2024-12-10 06:08:37.469575-08	1
d972fc4c-2a1d-468a-bac4-6b06cb311860	0c89aa1ef441f7b3a489c2847145c9f3acc43a0e1cd3aa7365ba7efe665efeb2	2024-12-10 06:08:37.682824-08	20241210135125_update_exam_id_type	\N	\N	2024-12-10 06:08:37.616776-08	1
386a127c-3f48-4624-b57a-bdfbc21318ff	fc2474e36d83491895f35cdc0cc42b97d5af284fcf4440ed25bfe360b95ff731	2024-12-10 06:08:37.48124-08	20241029140445_changed	\N	\N	2024-12-10 06:08:37.475629-08	1
e24e2daf-19ad-40f8-bbf4-bd038349c5ca	f05560f815f66c47cb93c090a308529ff13a174c9b14b54d6ad799ff47f7e27a	2024-12-10 06:08:37.54715-08	20241106121800_update	\N	\N	2024-12-10 06:08:37.541212-08	1
3a02c9a2-f456-4baa-a0c0-4aabb71c0c4c	3e6950c6546534bd627374f0edec54c9db61864ee8cfdbbe87872bcb3b98f484	2024-12-10 06:08:37.491532-08	20241031143507_minor	\N	\N	2024-12-10 06:08:37.482516-08	1
46a303e6-64ab-447d-b0e2-87e9554c2493	1803a2428a6af947ebefbfc0b33be39603ebaf888bfa6a09968197219c49e0e8	2024-12-10 06:08:37.510777-08	20241105084930_initial_migration	\N	\N	2024-12-10 06:08:37.493965-08	1
6ca384ac-9bd1-4175-b4ea-34952792751e	50342c11ab4c0d1ffe78047a9e28a610b9453b5098db6ad67d5681cf80b8d4f0	2024-12-10 06:08:37.553356-08	20241106124719_add_student_name_to_result	\N	\N	2024-12-10 06:08:37.548965-08	1
5fbaffcc-3889-406e-8b79-9f8c02da65f2	f52407e1fce3106eb391414afb027c32cf83732b96b1e2cd27e4b6be547299eb	2024-12-10 06:08:37.588658-08	20241204130805_update_exam_id_to_string	\N	\N	2024-12-10 06:08:37.555154-08	1
90e2bbc6-cfe5-4a23-91df-2ac128bf44d3	58483a2fdd4c6cd527592dda12898512718717298ce2680268e7adbb92b52fdc	2024-12-10 06:08:37.614807-08	20241209113954_change_exam_id_to_string	\N	\N	2024-12-10 06:08:37.591315-08	1
\.


--
-- Name: Answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Answer_id_seq"', 1, false);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Course_id_seq"', 1, true);


--
-- Name: Enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Enrollment_id_seq"', 1, true);


--
-- Name: ExamAttempt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExamAttempt_id_seq"', 1, false);


--
-- Name: Exam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exam_id_seq"', 1, true);


--
-- Name: PasswordReset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PasswordReset_id_seq"', 1, false);


--
-- Name: Question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Question_id_seq"', 5, true);


--
-- Name: Result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Result_id_seq"', 1, false);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 3, true);


--
-- Name: StudentExam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StudentExam_id_seq"', 1, false);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Student_id_seq"', 1, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Enrollment Enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY (id);


--
-- Name: ExamAttempt ExamAttempt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamAttempt"
    ADD CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY (id);


--
-- Name: Exam Exam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exam"
    ADD CONSTRAINT "Exam_pkey" PRIMARY KEY (id);


--
-- Name: PasswordReset PasswordReset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Result Result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: StudentExam StudentExam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentExam"
    ADD CONSTRAINT "StudentExam_pkey" PRIMARY KEY (id);


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Course_courseCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Course_courseCode_key" ON public."Course" USING btree ("courseCode");


--
-- Name: Enrollment_studentID_courseId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Enrollment_studentID_courseId_key" ON public."Enrollment" USING btree ("studentID", "courseId");


--
-- Name: ExamAttempt_studentID_examID_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ExamAttempt_studentID_examID_key" ON public."ExamAttempt" USING btree ("studentID", "examID");


--
-- Name: Exam_examID_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Exam_examID_key" ON public."Exam" USING btree ("examID");


--
-- Name: Question_questionID_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Question_questionID_key" ON public."Question" USING btree ("questionID");


--
-- Name: Result_studentID_examID_examAttemptID_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Result_studentID_examID_examAttemptID_key" ON public."Result" USING btree ("studentID", "examID", "examAttemptID");


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: StudentExam_studentID_examId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StudentExam_studentID_examId_key" ON public."StudentExam" USING btree ("studentID", "examId");


--
-- Name: Student_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Student_email_key" ON public."Student" USING btree (email);


--
-- Name: Student_studentID_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Student_studentID_key" ON public."Student" USING btree ("studentID");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Answer Answer_examID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Answer Answer_questionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Answer Answer_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Answer Answer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Enrollment Enrollment_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Enrollment Enrollment_examId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_examId_fkey" FOREIGN KEY ("examId") REFERENCES public."Exam"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Enrollment Enrollment_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExamAttempt ExamAttempt_examID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamAttempt"
    ADD CONSTRAINT "ExamAttempt_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExamAttempt ExamAttempt_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamAttempt"
    ADD CONSTRAINT "ExamAttempt_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Exam Exam_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exam"
    ADD CONSTRAINT "Exam_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PasswordReset PasswordReset_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_examID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_examAttemptID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_examAttemptID_fkey" FOREIGN KEY ("examAttemptID") REFERENCES public."ExamAttempt"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_examID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_examID_fkey" FOREIGN KEY ("examID") REFERENCES public."Exam"("examID") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StudentExam StudentExam_examId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentExam"
    ADD CONSTRAINT "StudentExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES public."Exam"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StudentExam StudentExam_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentExam"
    ADD CONSTRAINT "StudentExam_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Student Student_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

